package com.group.sh.smarthome.resultbean;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.List;

/**
 * 菜单配置实体信息类
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class MenuTreeInfo implements Serializable {

    private  String title;
    private  Integer id;
    private List<MenuTreeInfo> children;

}
