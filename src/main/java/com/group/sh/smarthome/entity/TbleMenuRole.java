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
 *      角色菜单关系信息类
 * </p>
 *
 * @author fzq
 * @since 2020-12-6
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class TbleMenuRole extends GenericClass {

    /**
     * 角色菜单id
     */
    @TableId(value = "ROLE_MENU_ID", type = IdType.AUTO)
    private Integer roleMenuId;

    /**
     * 角色id
     */
    @TableField("ROLE_ID")
    private Integer roleId;

    /**
     * 菜单id
     */
    @TableField("MENU_ID")
    private Integer menuId;

    private List fatherNodeId;
    private List sonNodeId;
    private String adminRole;

}
