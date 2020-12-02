package com.group.sh.smarthome.util;

public class ConstantEnum {

    public enum ConstantEnumType {
        STATUSNUM("1"),
        DELETENUM("1"),
        LISTSIZENUM("0");
        private String value;
        private String desc;
        public static final Object ENTITY = null;
        public static final Object CONSTANT = null;

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
