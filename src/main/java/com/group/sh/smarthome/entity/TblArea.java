package com.group.sh.smarthome.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;

/**
 * <p>
 *      省市县信息类
 * </p>
 *
 * @author fzq
 * @since 2020-12-18
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class TblArea implements Serializable {

    private static final long serialVersionUID=1L;

    /**
     * 主键id
     */
    @TableId(value = "AREA_ID", type = IdType.AUTO)
    private Integer areaId;

    /**
     * 区域编码
     */
    @TableField("AREA_CODE")
    private String areaCode;

    /**
     * 区域名称
     */
    @TableField("AREA_NAME")
    private String areaName;

    /**
     * 区域层级
     */
    @TableField("AREA_LVL")
    private String areaLvl;

    /**
     * 父级区域编码
     */
    @TableField("AREA_PARENT_CODE")
    private String areaParentCode;

    private String method;
}
