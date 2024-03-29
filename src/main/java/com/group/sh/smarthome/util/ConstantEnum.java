package com.group.sh.smarthome.util;
/**
 * <pre>
 *      Title: 智慧家庭信息系统枚举类
 *      Description: 主要用于一些常量定义
 * </pre>
 * @author fzq
 * @version 1.00.00
 * @since 创建日期：2020-12-2
 */
public class ConstantEnum {

    public enum ConstantEnumType {
        FINDMENUSELECT("1"),//查询菜单下拉框
        STATUSNUM("1"),//用于状态判断
        DELETENUM("1"),//用于删除标识判断
        LISTSIZENUM("0"),//用于集合长度为0判断
        DATABASENUM("0"),//用于增删改时数据库返回值得判断
        INSERT("0"),//用于增删改方法值区分
        UPDATE("1"),//用于增删改方法值区分
        DELETE("2"),//用于增删改方法值区分
        PROVINCE("0"),//省
        CITY("1"),//市
        AREA("2"),//区
        ADMINMOD("管理员模块"),
        USERMOD("用户模块");
        private String value;
        private String desc;
        public static Integer roleId = null;
        public static final Object ENTITY = null;//用于对象为null判断
        public static final Object CONSTANT = null;//用于常量为null判断

        // 构造器默认也只能是private, 从而保证构造函数只能在内部使用
        ConstantEnumType(String value) {
            this.value = value;
            this.desc = desc;
        }

        public String getValue() {
            return value;
        }

        public void setValue(String value) {
            this.value = value;
        }

        public String getDesc() {
            return desc;
        }

        public void setDesc(String desc) {
            this.desc = desc;
        }

        public static Object getENTITY() {
            return ENTITY;
        }

        public static Object getCONSTANT() {
            return CONSTANT;
        }

        public static String getDescByValue(String value){
            for (ConstantEnumType num: values()) {
               if(num.getValue().equals(value));
            }
            return null;
        }
    }

}
