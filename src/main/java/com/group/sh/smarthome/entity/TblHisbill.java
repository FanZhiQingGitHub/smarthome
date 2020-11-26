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
public class TblHisbill implements Serializable {

    private static final long serialVersionUID=1L;

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
     * 借款时间
     */
    @TableField("HISBILL_BEGINTIME")
    private Date hisbillBegintime;

    /**
     * 预计还款时间
     */
    @TableField("HISBILL_ESTREPTM")
    private Date hisbillEstreptm;

    /**
     * 还款时间
     */
    @TableField("HISBILL_ENDTIME")
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

    @TableField("CRT_PSN_ID")
    private String crtPsnId;

    @TableField("CRT_TM")
    private Date crtTm;

    @TableField("MOD_PSN_ID")
    private String modPsnId;

    @TableField("MOD_TM")
    private Date modTm;

    @TableField("DEL_ID")
    private String delId;


}
