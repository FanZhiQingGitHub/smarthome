package com.group.sh.smarthome.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import java.util.Date;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableField;
import java.io.Serializable;
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
public class TblAdmin implements Serializable {

    private static final long serialVersionUID=1L;

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

    @TableField("ADMIN_ADDRESS")
    private String adminAddress;

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
     * 创建人
     */
    @TableField("CRT_PSN_ID")
    private String crtPsnId;

    /**
     * 创建时间
     */
    @TableField("CRT_TM")
    private Date crtTm;

    /**
     * 修改人
     */
    @TableField("MOD_PSN_ID")
    private String modPsnId;

    /**
     * 修改时间
     */
    @TableField("MOD_TM")
    private Date modTm;

    /**
     * 删除标识
     */
    @TableField("DEL_ID")
    private String delId;

    /**
     * 管理员角色
     */
    @TableField("ADMIN_ROLE")
    private String adminRole;


}