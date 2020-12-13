package com.group.sh.smarthome.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;

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

    /**
     * 管理员地址
     */
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
    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern ="yyyy-MM-dd")
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
    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern ="yyyy-MM-dd")
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
    private Integer adminRole;
    private String adminRoleName;

    /**
     * 管理员登录验证码
     */
    private String adminCode;

    /*
     *用于区分查询菜单是查询列表还是下拉框
     * 0--新增
     * 1--修改
     * 2--删除
     * 3--查看详情
     * 未发送method值的为查列表
     */
    private String method;


}
