const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize('demo', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  // logging: false
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const User = sequelize.define('user', {
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: 'user name'
  },
  userBlo: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'user blo'
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'avatar'
  }
})

// const save = async () => {
//   const user = User.build({ userName: 'admin', userBlo: 'test data' })
//   const result = await user.save()
//   console.log(result);
// }

// save()

// User.sync({ tableName: 'user', force: true })

module.exports = { sequelize, User }
