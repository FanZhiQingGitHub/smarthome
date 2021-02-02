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
 *      角色信息类
 * </p>
 *
 * @author fzq
 * @since 2020-11-26
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class TblRole extends GenericClass {

    /**
     * 角色id
     */
    @TableId(value = "ROLE_ID", type = IdType.AUTO)
    private Integer roleId;

    /**
     * 角色名称
     */
    @TableField("ROLE_NAME")
    private String roleName;

    /**
     * 角色类型（用于区分是超级管理员还是普通管理员）
     */
    @TableField("ROLE_TYPE")
    private String roleType;

    private List<TblMenu> menuList;

}
