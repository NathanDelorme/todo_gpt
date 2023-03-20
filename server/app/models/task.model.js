module.exports = (connex, Sequelize) => {
    const Task = connex.define("task", {
        idTask: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        isFinished: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        priority: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        idTodolist: {
            type: Sequelize.INTEGER,
            foreignKey: true
        }
    }, {
        tableName: 'task',
        timestamps: false
    });

    return Task;
};
