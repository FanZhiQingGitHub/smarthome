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
public class TblAccountinfo implements Serializable {

    private static final long serialVersionUID=1L;

    /**
     * 账户信息id
     */
    @TableId(value = "ACCOUNT_ID", type = IdType.AUTO)
    private Integer accountId;

    /**
     * 账户信息类型名称
     */
    @TableField("ACCOUNT_TYPENM")
    private String accountTypenm;

    /**
     * 账户信息账号
     */
    @TableField("ACCOUNT_ACCOUNTNUM")
    private String accountAccountnum;

    /**
     * 账户信息手机号码
     */
    @TableField("ACCOUNT_PHONE")
    private String accountPhone;

    /**
     * 账户信息密码
     */
    @TableField("ACCOUNT_PWD")
    private String accountPwd;

    /**
     * 账户信息昵称
     */
    @TableField("ACCOUNT_NICKNAME")
    private String accountNickname;

    /**
     * 账户信息邮箱
     */
    @TableField("ACCOUNT_MAIL")
    private String accountMail;

    /**
     * 账户信息URL
     */
    @TableField("ACCOUNT_URL")
    private String accountUrl;

    /**
     * 账户信息密保问题
     */
    @TableField("ACCOUNT_SECURITY")
    private String accountSecurity;

    /**
     * 账户信息密保问题答案
     */
    @TableField("ACCOUNT_QUESTION_ONE")
    private String accountQuestionOne;

    /**
     * 账户信息密保问题答案
     */
    @TableField("ACCOUNT_QUESTION_TWO")
    private String accountQuestionTwo;

    /**
     * 账户信息密保问题答案
     */
    @TableField("ACCOUNT_QUESTION_THREE")
    private String accountQuestionThree;

    /**
     * 创建人id
     */
    @TableField("CRT_PSN_ID")
    private String crtPsnId;

    /**
     * 创建时间
     */
    @TableField("CRT_TM")
    private Date crtTm;

    /**
     * 修改人id
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


}
