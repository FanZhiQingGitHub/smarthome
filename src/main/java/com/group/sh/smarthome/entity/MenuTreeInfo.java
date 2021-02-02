package com.group.sh.smarthome.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.util.List;

/**
 * <p>
 *      菜单返回前端json格式实体信息类
 * </p>
 *
 * @author fzq
 * @since 2020-12-6
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class MenuTreeInfo extends GenericClass {

    private String dataUrl;
    private String dataTitle;
    private String dataId;
    private String dataType;

    private String title;
    private Integer id;

    private String menuId;
    private String menuName;
    private String count;

    private List<MenuTreeInfo> children;

}
