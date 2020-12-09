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
import java.util.List;

/**
 * <p>
 *      菜单实体信息类
 * </p>
 *
 * @author fzq
 * @since 2020-12-6
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class TblMenu implements Serializable {

    private static final long serialVersionUID=1L;

    /**
     * 菜单id
     */
    @TableId(value = "MENU_ID", type = IdType.AUTO)
    private Integer menuId;

    /**
     * 菜单名称
     */
    @TableField("MENU_NAME")
    private String menuName;//对应前端的Title


    /**
     * 菜单跳转地址
     */
    @TableField("MENU_URL")
    private String menuUrl;

    /**
     * 菜单类型，用于区分默认显示的选项卡还是新增选项卡
     */
    @TableField("MENU_TYPE")
    private String menuType;

    /**
     * 菜单子id
     */
    @TableField("MENUSUB_ID")
    private Integer menuSubId;

    /**
     * 用于区分菜单是否为父级菜单
     */
    @TableField("MENU_LEVEL")
    private String menuLevel;


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
    private Integer delId;

    private List<TblMenu> children;

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
