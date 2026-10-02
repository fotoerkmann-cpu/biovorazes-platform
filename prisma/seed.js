const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed do banco de dados...');

  // Limpando usuários existentes (opcional para testes)
  await prisma.user.deleteMany({});

  const passwordHash = await bcrypt.hash('senha123', 10);

  // Criando Professor Charles
  const professor = await prisma.user.create({
    data: {
      name: 'Professor Charles',
      email: 'professor@biovorazes.com',
      password: passwordHash,
      role: 'TEACHER',
      isSubscriber: true,
    },
  });

  const profLafaHash = await bcrypt.hash('lilica10', 10);
  // Criando Professor Lafa
  const profLafa = await prisma.user.create({
    data: {
      name: 'Professor Lafa',
      email: 'prof.lafa@gmail.com',
      password: profLafaHash,
      role: 'TEACHER',
      isSubscriber: true,
    },
  });

  // Criando Aluno
  const aluno = await prisma.user.create({
    data: {
      name: 'Aluno Curioso',
      email: 'aluno@email.com',
      password: passwordHash,
      role: 'STUDENT',
      isSubscriber: true,
      xp: 450,
      level: 3,
      stage: 'LARVA',
    },
  });

  console.log('Usuários de teste criados com sucesso!');
  console.log('------------------------------------');
  console.log('Professor:');
  console.log(`- Email: ${professor.email}`);
  console.log('- Senha: senha123');
  console.log('------------------------------------');
  console.log('Aluno:');
  console.log(`- Email: ${aluno.email}`);
  console.log('- Senha: senha123');
  console.log('------------------------------------');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
