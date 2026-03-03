const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // 1. Create a Tenant
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

  // 2. Create an Employer Group
  // We check if ACME Corp exists for this tenant
  let employer = await prisma.employerGroup.findFirst({
    where: { name: 'ACME Corp', tenantId: tenant.id }
  });

  if (!employer) {
    employer = await prisma.employerGroup.create({
      data: {
        tenantId: tenant.id,
        name: 'ACME Corp',
        planRules: {
          "deductible": 1000,
          "copays": {
            "ER Level 5 Visit": 800,
            "Ambulance": 0,
            "Specialist": 50,
            "PrimaryCare": 25,
            "Dental Surgery": 200
          },
          "coinsurance": "80%",
          "notes": "Emergency transportation (Ambulance) is covered at 100% with $0 copay. ER visits have a strict $800 copay."
        }
      }
    });
  }

  // 3. Create a Member
  let member = await prisma.member.findUnique({
    where: { id: 'demo-member-id' }
  });

  if (!member) {
    member = await prisma.member.create({
      data: {
        id: 'demo-member-id', // Using the hardcoded ID from the UI
        employerGroupId: employer.id,
        firstName: 'John',
        lastName: 'Doe',
      }
    });
  }

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
