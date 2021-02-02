package com.group.sh.smarthome.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 
 * </p>
 *
 * @author fzq
 * @since 2020-11-26
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class TblAdmin extends GenericClass {

    /**
     * 管理员id
     */
    @TableId(value = "ADMIN_ID", type = IdType.AUTO)
    private Integer adminId;

    /**
     * 管理员账号
     */
    @TableField("ADMIN_ACCOUNT")
    private String adminAccount;

    /**
     * 管理员密码
     */
    @TableField("ADMIN_PWD")
    private String adminPwd;

    /**
     * 管理员名称
     */
    @TableField("ADMIN_NAME")
    private String adminName;

    /**
     * 管理员真实名称
     */
    @TableField("ADMIN_REALNAME")
    private String adminRealName;

    /**
     * 管理员性别
     */
    @TableField("ADMIN_SEX")
    private String adminSex;

    /**
     * 管理员手机
     */
    @TableField("ADMIN_PHONE")
    private String adminPhone;

    /**
     * 管理员工作手机
     */
    @TableField("ADMIN_WORKPHONE")
    private String adminWorkphone;

    /**
     * 管理员邮箱
     */
    @TableField("ADMIN_MAIL")
    private String adminMail;

    /**
     * 管理员地址(省)
     */
    @TableField("ADMIN_ADDRESS_PROVINCE")
    private String adminAddressProvince;

    /**
     * 管理员地址(市)
     */
    @TableField("ADMIN_ADDRESS_CITY")
    private String adminAddressCity;

    /**
     * 管理员地址(区)
     */
    @TableField("ADMIN_ADDRESS_AREA")
    private String adminAddressArea;

    /**
     * 管理员头像
     */
    @TableField("ADMIN_HEAD")
    private String adminHead;

    /**
     * 管理员状态
     */
    @TableField("ADMIN_STATUS")
    private String adminStatus;

    /**
     * 删除标识
     */
    @TableField("DEL_ID")
    private String delId;

    /**
     * 管理员角色
     */
    @TableField("ADMIN_ROLE")
    private Integer adminRole;
    private String adminRoleName;

    /**
     * 管理员登录验证码
     */
    private String adminCode;

}
