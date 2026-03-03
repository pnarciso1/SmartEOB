import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // 1. Tenant
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'tpa_a' },
    update: {},
    create: {
      slug: 'tpa_a',
      name: 'Northwest HSA Admin',
      apiKeyHash: 'demo-hash-123',
      primaryColor: '#1e3a8a',
    },
  });

  // 2. Employer Group — upsert by tenantId so rename always takes effect
  const existingEmployer = await prisma.employerGroup.findFirst({
    where: { tenantId: tenant.id },
  });

  const planRules = {
    deductible: 1000,
    copays: {
      'ER Level 5 Visit': 800,
      Ambulance: 0,
      Specialist: 50,
      PrimaryCare: 25,
      'Dental Surgery': 200,
    },
    coinsurance: '80%',
    notes:
      'Emergency transportation (Ambulance) is covered at 100% with $0 copay. ER visits have a strict $800 copay.',
  };

  const employer = existingEmployer
    ? await prisma.employerGroup.update({
        where: { id: existingEmployer.id },
        data: { name: 'Unity Global Care', planRules },
      })
    : await prisma.employerGroup.create({
        data: {
          tenantId: tenant.id,
          name: 'Unity Global Care',
          planRules,
        },
      });

  // 3. Member — upsert so rename always takes effect
  const member = await prisma.member.upsert({
    where: { id: 'demo-member-id' },
    update: { firstName: 'Dave', lastName: 'Duplay' },
    create: {
      id: 'demo-member-id',
      employerGroupId: employer.id,
      firstName: 'Dave',
      lastName: 'Duplay',
    },
  });

  console.log('Seeding finished.');
  console.log('-------------------');
  console.log('Tenant ID:', tenant.id);
  console.log('Employer ID:', employer.id);
  console.log('Member ID:', member.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
