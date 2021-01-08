import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@socialmediasimulator.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Samuel Gitonga',
    email: 'samuel@socialmediasimulator.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Kelvin Ngure',
    email: 'kelvin@socialmediasimulator.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
