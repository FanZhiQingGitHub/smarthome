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
     * 操作结果
     */
    @TableField("SYSLOG_RESULT")
    private String syslogResult;

    /**
     * 操作详情
     */
    @TableField("SYSLOG_DETAIL")
    private String syslogDetail;

    /**
     * 操作类型
     */
    @TableField("SYSLOG_TYPE")
    private String syslogType;

    /**
     * 操作计算机ip
     */
    @TableField("SYSLOG_IP")
    private String syslogIp;

    /**
     * 操作时间
     */
    @TableField("SYSLOG_TIME")
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


}
