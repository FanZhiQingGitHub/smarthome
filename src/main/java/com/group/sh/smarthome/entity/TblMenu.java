package com.group.sh.smarthome.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

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
public class TblMenu extends GenericClass {

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

    private List<TblMenu> children;


}
