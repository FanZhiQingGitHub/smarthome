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
 *      资讯表信息类
 * </p>
 *
 * @author fzq
 * @since 2020-11-26
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class TblInfo implements Serializable {

    private static final long serialVersionUID=1L;

    /**
     * 资讯id
     */
    @TableId(value = "INFO_ID", type = IdType.AUTO)
    private Integer infoId;

    /**
     * 资讯标题
     */
    @TableField("INFO_TITLE")
    private String infoTitle;

    /**
     * 资讯内容
     */
    @TableField("INFO_DETAIL")
    private String infoDetail;

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
