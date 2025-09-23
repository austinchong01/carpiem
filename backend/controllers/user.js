const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

// Your schema is now live and ready to use!
async function createUser(username, email, password) {
  try {
    const user = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: await bcrypt.hash(password, 10)
      },
    });

    console.log("User created successfully:", user);
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = { createUser };
