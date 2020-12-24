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
public class TblSyslog implements Serializable {

    private static final long serialVersionUID=1L;

    /**
     * 日志id
     */
    @TableId(value = "SYSLOG_ID", type = IdType.AUTO)
    private Integer syslogId;

    /**
     * 操作人
     */
    @TableField("SYSLOG_OPERATOR")
    private String syslogOperator;

    /**
     * 操作人账号
     */
    @TableField("SYSLOG_OPERATOR_ACCOUNT")
    private String syslogOperatorAccount;

    /**
     * 操作详情
     */
    @TableField("SYSLOG_DETAIL")
    private String syslogDetail;

    /**
     * 操作类型
     */
    @TableField("SYSLOG_TYPE")
    private String syslogType;//0新增，1修改，2删除

    /**
     * 操作结果
     */
    @TableField("SYSLOG_RESULT")
    private String syslogResult;//0正常，1异常


    /**
     * 操作地址IP
     */
    @TableField("SYSLOG_IP")
    private String syslogIp;

    /**
     * 操作时间
     */
    @TableField("SYSLOG_TIME")
    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern ="yyyy-MM-dd")
    private Date syslogTime;

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
