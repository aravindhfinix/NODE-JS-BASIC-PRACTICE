module.exports=(Sequelize,DataTypes)=>{
    
const user=Sequelize.define("user",{
    firstName:{
    type:DataTypes.STRING,
    allowNull:false,
    validate:{
        notEmpty:true
    }},
    age:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true
        }}
})
return user;
}
