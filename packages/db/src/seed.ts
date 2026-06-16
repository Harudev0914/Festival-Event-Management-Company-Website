import { db, users } from '@repo/db';

async function seed() {
  console.log('Seeding initial admin...');
  
  await db.insert(users).values({
    name: 'Admin',
    email: 'admin', // Changed to 'admin' as requested
    role: 'admin',
    // password: 'admin123!@#', // Note: Must be hashed before storage in real app
  }).onConflictDoNothing({
    target: users.email,
  });
  
  console.log('Admin seeded successfully.');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
