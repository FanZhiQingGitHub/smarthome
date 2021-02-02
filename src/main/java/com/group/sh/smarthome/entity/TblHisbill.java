package com.group.sh.smarthome.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;
import org.springframework.format.annotation.DateTimeFormat;

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
public class TblHisbill extends GenericClass {

    /**
     * 账款id
     */
    @TableId(value = "HISBILL_ID", type = IdType.AUTO)
    private Integer hisbillId;

    /**
     * 账款名称
     */
    @TableField("HISBILL_NAME")
    private String hisbillName;

    /**
     * 账款描述
     */
    @TableField("HISBILL_DETAIL")
    private String hisbillDetail;

    /**
     * 借款时间
     */
    @TableField("HISBILL_BEGINTIME")
    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern ="yyyy-MM-dd")
    private Date hisbillBegintime;

    /**
     * 预计还款时间
     */
    @TableField("HISBILL_ESTREPTM")
    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern ="yyyy-MM-dd")
    private Date hisbillEstreptm;

    /**
     * 还款时间
     */
    @TableField("HISBILL_ENDTIME")
    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
    @DateTimeFormat(pattern ="yyyy-MM-dd")
    private Date hisbillEndtime;

    /**
     * 借款金额
     */
    @TableField("HISBILL_AMOUNT")
    private Integer hisbillAmount;

    /**
     * 借款人
     */
    @TableField("HISBILL_MEN")
    private String hisbillMen;

    /**
     * 借款人手机联系方式
     */
    @TableField("HISBILL_MENPHONE")
    private String hisbillMenphone;

    /**
     * 账款类型
     */
    @TableField("HISBILL_TYPE")
    private String hisbillType;

    /**
     * 账款状态（0-已结，1-未结）
     */
    @TableField("HISBILL_STATUS")
    private String hisbillStatus;

}
