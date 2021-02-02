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
public class TblAccountInfo extends GenericClass {

    /**
     * 账户信息id
     */
    @TableId(value = "ACCOUNT_ID", type = IdType.AUTO)
    private Integer accountId;

    /**
     * 账户账号
     */
    @TableField("ACCOUNT_NUM")
    private String accountNum;

    /**
     * 账户信息名称
     */
    @TableField("ACCOUNT_NM")
    private String accountNm;

    /**
     * 账户信息手机号码
     */
    @TableField("ACCOUNT_PHONE")
    private String accountPhone;

    /**
     * 账户信息密码一
     */
    @TableField("ACCOUNT_PWD_ONE")
    private String accountPwdOne;

    /**
     * 账户信息密码二
     */
    @TableField("ACCOUNT_PWD_TWO")
    private String accountPwdTwo;

    /**
     * 账户信息密码三
     */
    @TableField("ACCOUNT_PWD_THREE")
    private String accountPwdThree;

    /**
     * 账户信息查看密码（安全保障）
     */
    @TableField("ACCOUNT_PWD_SEU")
    private String accountPwdSeu;


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
     * 账户信息类型
     */
    @TableField("ACCOUNT_TYPE")
    private String accountType;
    private String accountTypeNm;


}
