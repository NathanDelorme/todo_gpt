module.exports = (connex, Sequelize) => {
    const User = connex.define("user", {
        idUser: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: Sequelize.STRING(320),
            unique: true,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING(100),
            allowNull: false,
        }
    }, {
        tableName: 'user',
        timestamps: false
    });

    return User;
};
