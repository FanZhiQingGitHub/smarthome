package com.group.sh.smarthome.interceptor;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class smartHomeConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 注册拦截器
        smartHomeInterceptor smartHomeInterceptor = new smartHomeInterceptor();
        InterceptorRegistration loginRegistry = registry.addInterceptor(smartHomeInterceptor);
        // 拦截路径
        loginRegistry.addPathPatterns("/**");
        // 排除路径
        loginRegistry.excludePathPatterns("/smarthome/admin/path/adminLogin");
        loginRegistry.excludePathPatterns("/smarthome/admin/path/menuPortion");
        loginRegistry.excludePathPatterns("/smarthome/admin/adminLogin");
        loginRegistry.excludePathPatterns("/smarthome/admin/path/resetAdminPwd");
        loginRegistry.excludePathPatterns("/smarthome/admin/resetAdminPassword");
        loginRegistry.excludePathPatterns("/smarthome/user/path/homePage");
        loginRegistry.excludePathPatterns("/smarthome/user/path/userLogin");
        loginRegistry.excludePathPatterns("/smarthome/user/userLogin");
        loginRegistry.excludePathPatterns("/smarthome/user/path/userReg");
        loginRegistry.excludePathPatterns("/smarthome/user/userReg");

        loginRegistry.excludePathPatterns("/smarthome/user/path/product");
        loginRegistry.excludePathPatterns("/smarthome/user/path/news");
        loginRegistry.excludePathPatterns("/smarthome/user/path/about");
        loginRegistry.excludePathPatterns("/smarthome/user/path/resetUserPwd");
        loginRegistry.excludePathPatterns("/smarthome/user/resetUserPassword");

        loginRegistry.excludePathPatterns("/smarthome/public/path/404");

        loginRegistry.excludePathPatterns("/admincss/**");
        loginRegistry.excludePathPatterns("/adminjs/**");
        loginRegistry.excludePathPatterns("/layui/**");
        loginRegistry.excludePathPatterns("/publicimage/**");
        loginRegistry.excludePathPatterns("/publicjs/**");
        loginRegistry.excludePathPatterns("/usercss/**");
        loginRegistry.excludePathPatterns("/userHeadImg/**");
        loginRegistry.excludePathPatterns("/userjs/**");
        loginRegistry.excludePathPatterns("/adminhtml/**");
        loginRegistry.excludePathPatterns("/userhtml/**");
        loginRegistry.excludePathPatterns("/errorhtml/**");
        loginRegistry.excludePathPatterns("/publicvideo/**");
        loginRegistry.excludePathPatterns("/homeImg/**");
        loginRegistry.excludePathPatterns("/publiccss/**");

    }
}
