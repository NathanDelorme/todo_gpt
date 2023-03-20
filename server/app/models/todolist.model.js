module.exports = (connex, Sequelize) => {
    const Todolist = connex.define("todolist", {
        idTodolist: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        creationDate: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        lastModifiedDate: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        idUser: {
            type: Sequelize.INTEGER,
            foreignKey: true
        }
    }, {
        tableName: 'todolist',
        timestamps: false
    });

    return Todolist;
};
