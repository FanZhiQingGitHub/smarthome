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
 *      用户实体信息类
 * </p>
 *
 * @author fzq
 * @since 2020-11-26
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class TblUser implements Serializable {

    private static final long serialVersionUID=1L;

    /**
     * 用户id
     */
    @TableId(value = "USER_ID", type = IdType.AUTO)
    private Integer userId;

    /**
     * 用户账号
     */
    @TableField("USER_ACCOUNT")
    private String userAccount;

    /**
     * 用户密码
     */
    @TableField("USER_PWD")
    private String userPwd;

    /**
     * 用户名
     */
    @TableField("USER_NAME")
    private String userName;

    /**
     * 用户性别
     */
    @TableField("USER_SEX")
    private String userSex;

    /**
     * 用户年龄
     */
    @TableField("USER_AGE")
    private String userAge;

    /**
     * 用户手机
     */
    @TableField("USER_PHONE")
    private String userPhone;

    /**
     * 用户工作手机
     */
    @TableField("USER_WORKPHONE")
    private String userWorkphone;

    /**
     * 用户职业
     */
    @TableField("USER_JOB")
    private String userJob;

    /**
     * 用户邮箱
     */
    @TableField("USER_MAIL")
    private String userMail;

    /**
     * 用户地址(省)
     */
    @TableField("USER_ADDRESS_PROVINCE")
    private String userAddressProvince;

    /**
     * 用户地址(市)
     */
    @TableField("USER_ADDRESS_CITY")
    private String userAddressCity;

    /**
     * 用户地址(区)
     */
    @TableField("USER_ADDRESS_AREA")
    private String userAddressArea;

    /**
     * 用户地址(详细门牌号)
     */
    @TableField("USER_ADDRESS_DETAIL")
    private String userAddressDetail;


    /**
     * 用户QQ号码
     */
    @TableField("USER_QQ")
    private String userQq;

    /**
     * 用户微信号码
     */
    @TableField("USER_WECHAT")
    private String userWechat;

    /**
     * 用户证件类型
     */
    @TableField("USER_IDCARDTYPE")
    private String userIdcardtype;

    /**
     * 用户证件号码
     */
    @TableField("USER_IDCARDNUM")
    private String userIdcardnum;

    /**
     * 用户头像url
     */
    @TableField("USER_HEADURL")
    private String userHeadurl;

    /**
     * 用户简介
     */
    @TableField("USER_RESUME")
    private String userResume;

    /**
     * 用户学历
     */
    @TableField("USER_EDDGRCD")
    private String userEddgrcd;

    /**
     * 用户学位
     */
    @TableField("USER_DGRCD")
    private String userDgrcd;

    /**
     * 用户毕业院校
     */
    @TableField("USER_GRDT_SCHCD")
    private String userGrdtSchcd;

    /**
     * 用户所学专业
     */
    @TableField("USER_MJR")
    private String userMjr;

    /**
     * 用户毕业时间
     */
    @TableField("USER_GRDTM")
    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd")
    @DateTimeFormat(pattern ="yyyy-MM-dd")
    private Date userGrdtm;

    /**
     * 用户状态
     */
    @TableField("USER_STATUS")
    private String userStatus;

    /**
     * 创建人id
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
     * 修改人id
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
     * 用户角色
     */
    @TableField("USER_ROLE")
    private Integer userRole;

    private String userRoleName;

    /**
     * 用户登录验证码
     */
    private String userCode;

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
