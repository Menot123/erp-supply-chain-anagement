'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Comment.init({
        quoteId: DataTypes.INTEGER,
        body: DataTypes.STRING,
        username: DataTypes.STRING,
        userId: DataTypes.STRING,
        parentId: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Comment',
        tableName: 'comments'
    });
    return Comment;
};