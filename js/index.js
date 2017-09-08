/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-06-13 18:16:54
 * @version $Id$
 */
//头部导航栏的效果
!function(){
    var $header=$('#header'),
        $topBar=$header.find('.topBar'),
        $logo=$topBar.find('.logo'),
        $logo2=$header.find('.logo2'),
        $liHide=$topBar.find('.hide'),
        $hasHide=$header.find('.hasHide'),
        $arrow=$header.find('.arrow'),
        $slideDown=$header.find('.slideDown'),
        $slideIndex=$header.find('.index');

    //导航里有隐藏层的锚点
    $hasHide.hover(function(){
        $topBar.addClass('hover')
        $slideDown.stop().slideDown();
        $slideIndex.eq($(this).index(".hasHide")).stop().fadeIn();
    },function(){
        $topBar.removeClass('hover')
        $slideDown.stop().slideUp();
        $slideIndex.eq($(this).index(".hasHide")).stop().fadeOut();
    });
    //下拉块保持显示隐藏
    $slideIndex.hover(function(){
        $slideDown.stop().slideDown();
        $hasHide.eq($(this).index()).addClass('hover');
        $arrow.eq($(this).index()).show();
        $(this).eq($(this).index(".hasHide")).stop().fadeIn();
        $topBar.addClass('hover')
    },function(){
        $slideDown.stop().slideUp();
        $hasHide.eq($(this).index()).removeClass('hover')
        $arrow.eq($(this).index()).hide();
        $(this).eq($(this).index(".hasHide")).stop().fadeOut();
        $topBar.removeClass('hover')
    })
    // 滚动高超过55 吸顶盒 与logo2缩放动画
    $(window).scroll(function(){
        if( $(document).scrollTop()>55 ){
            $topBar.addClass('scroll')
            $logo.stop().fadeIn(50);
            $logo2.addClass('scale')
            $liHide.show();
        }else{
            $topBar.removeClass('scroll')
            $logo.stop().fadeOut(50);
            $logo2.removeClass('scale')
            $liHide.hide();
        }
    })
}()
// 左边logo2的动画
!function(){
    var $logo2=$('#header').find('.logo2');
    $logo2.delay(1000).animate({
        left:50,
        opacity:1
    },800)
}()
// role角色动画
!function(){
    var $role=$('#role'),
        $rol1=$role.find('.rol1 .role'),
        $rol2=$role.find('.rol2 .role'),
        $btn=$role.find('.btn'),
        whichshow=false;  //false代表第一组显示 ， true代表第二组显示

        $rol1.removeClass('hide');
        $btn.click(function(){
            whichshow?change($rol2,$rol1):change($rol1,$rol2);
            whichshow=!whichshow;
        })
        function change($1,$2){
            $1.stop();
            $2.stop();
            $1.addClass('hide').delay(900).queue(function(){
                $2.removeClass('hide');
            })
        }
}()
// 服务器列表弹出层
!function(){
    var $servrListBtn=$('#serverListBtn'),
        $pop=$('#pop'),
        $bg=$pop.find('.bg'),
        $closeBtn=$pop.find('.closeBtn');
    $servrListBtn.click(function(){
        $pop.fadeIn();
        $bg.addClass('show');
    })
    $closeBtn.click(function(){
        $pop.fadeOut();
        $bg.removeClass('show');
    })
}()
// 游戏日历左边伸缩栏
!function(){
    var $rightSide=$('#rightSide'),
        $qrDownLoad=$rightSide.find('.qrDownLoad'),
        $shrinkBg=$rightSide.find('.shrinkBg'),
        $close=$rightSide.find('.downloadBox .close');
    $shrinkBg.click(function(){
        $qrDownLoad.addClass('stretch');
        $close.show();
        $(this).hide()
    });
    $close.click(function(){
        $qrDownLoad.removeClass('stretch');
        $close.stop().delay(200).queue(function(){
            $(this).hide();
            $shrinkBg.show();
        })
    })
}()

// 封装好的轮播构造函数
!function(){
    /*
        占用全局变量   banr（无自动轮播功能）  和  banr2（带自动轮播功能）
     */
    // banr轮播父类 面向对象写法
    function Banr($pic,$picLi,$tab){
        this.$pic=$pic;
        this.$tab=$tab;
        this.index=0;
        this.length=$picLi.length;
        this.width=$picLi.width();
        this.timerOut=null;
    }
    Banr.prototype={
        exe:function(){
            this.addEvent();
        },
        addEvent:function(){
            var This=this;
            this.$tab.mouseenter(function(){
                var $this=$(this);
                clearTimeout(This.timerOut)
                This.timerOut=setTimeout(function(){
                    This.index=This.$tab.index($this);
                    $this.addClass('on').siblings().removeClass('on');
                    This.$pic.stop().animate({left : -This.width*This.index},300);
                },200)
            })
        }
    }
    // 继承的banr2
    function Banr2($pic,$picLi,$tab,$box){
        Banr.call(this,$pic,$picLi,$tab)
        this.$box=$box;
        this.timer=null;
    }
    Banr2.prototype=Object.create(Banr.prototype)
    Banr2.prototype.temp=Banr2.prototype.exe;
    Banr2.prototype.exe=function(){
        this.temp();
        this.hover();
        this.autoPlay()
    }
    Banr2.prototype.hover=function(){
        var This=this;
        this.$box.hover(function(){
            clearInterval(This.timer)
        },function(){
            This.autoPlay()
        })
    }
    Banr2.prototype.autoPlay=function(){
        var This=this;
        this.timer=setInterval(function(){
            This.index ++;
            This.index%=This.length;
            This.$pic.stop().animate({left : -This.width*This.index},500);
            This.$tab.eq(This.index).addClass('on').siblings().removeClass('on');
        },3000)
    }
    window.Banr=Banr;
    window.Banr2=Banr2;
}()

// banner小轮播图(自动轮播)
!function(){
    var $banner=$('#banner'),
        $pic=$banner.find('.pic'),
        $picLi=$pic.find('ul li'),
        $tabSpan=$banner.find('.tab span');
    var banner=new Banr2($pic,$picLi,$tabSpan,$banner);
    banner.exe();
}()
// news新闻轮播区(无自动轮播)
!function(){
    var $news=$('#news'),
        $tabLi=$news.find('.tab ul li'),
        $info=$news.find('.info'),
        $list=$info.find('.list');
    $tabLi.mouseenter(function(){
        $(this).addClass('on').siblings().removeClass('on');
    });
    // 数据处理
    $list.each(function(i){
        var $ul=$('<ul></ul>');
        var num=0;
        for(var j=0; j<data.length; j++){
            if(data[j].typeX===i){
                $ul.append('<li><a href=""><p>'+data[j].title+'</p></a><span class="date">'+data[j].time+'</span></li>')
                num++;
                if(num===5) break;
            }
        }
        $(this).append($ul);
    })
    var banner=new Banr($info,$list,$tabLi);
    banner.exe();
}()

// 平安之旅 式神列表生成
!function(){
    var $mainContent=$('#mainContent'),
        $ul=$mainContent.find('.listWrap .mUl ul');

    // 处理数据 生成所有的式神图标
    var count=[[0,null],[0,null],[0,null],[0,null],[0,null]];
    for(var i=0,length=shishenData.length; i<length; i++){
        var index=0;
        switch ( shishenData[i].level ){
            case "SSR":
                index=1;
                break;
            case "SR":
                index=2;
                break;
            case "R":
                index=3;
                break;
            case "N":
                index=4;
                break;
        }
        count[0][0]++;
        count[index][0]++;
        if( count[0][0] % 2 ){
            count[0][1]=$("<li class='ssList'></li>");
            $ul.eq(0).append(count[0][1])
        }
        if( count[index][0] %2 ){
            count[index][1]=$('<li class="ssList"></li>');
            $ul.eq(index).append(count[index][1]);
        }
        var str=shishenData[i].isNew?"<i class='new'></i>":"";
        var $div=$('<div class="shishen"><img src="img/index/content/shishen/'+shishenData[i].id+'.png" alt=""><span class="cover"><p>'+shishenData[i].name+'</p></span>'+str+'</div>');
        var $cloneDiv=$div.clone();
        count[0][1].append($div);
        count[index][1].append($cloneDiv);
    }
}()
// 平安之旅 式神列表得的类型切换和左右移动动画
!function(){
    var $mainContent=$('#mainContent'),
        $shishenBtn=$mainContent.find('.shishenTab .clickBtn'),
        $mUl=$mainContent.find('.listWrap .mUl'),
        $btn=$mUl.find('.button'),
        $ul=$mUl.find('.ulWrap ul'),
        width=$mUl.find('ul li').width()*6+(21*6);

    $shishenBtn.click(function(){
        var Tindex=$(this).index();
        $(this).addClass('on').siblings().removeClass('on');
        $mUl.eq(Tindex).show().siblings('.mUl').hide().each(function(){  //tab切换后回到初始状态
            var $btn=$(this).find('.button');
            var length=Math.ceil($(this).find('ul li').length/6);
            if(this.index===length-1) $btn.eq(1).show();
            if(length===1) $btn.eq(1).hide();
            $(this).find('ul').css('marginLeft',0);
            $btn.eq(0).hide();
            this.index=0;
        });
    })
    $mUl.each(function(){
        var $ul=$(this).find('.ulWrap ul'),
            length=Math.ceil($(this).find('ul li').length/6),
            $btn=$(this).find('.button');
        this.index=0;
        $btn.eq(0).hide();
        if(this.index===length-1) $btn.eq(1).hide();
        $btn.click(function(){
            var parent=this.parentNode;
            var i=$(this).index($btn);
            console.log(i)
            if(i){
                parent.index++;
                parent.index%=length;
            }else{
                parent.index--;
                if(parent.index<0) parent.index=length-1;
            }
            parent.index==0?$btn.eq(0).hide():$btn.eq(0).show();
            parent.index==length-1?$btn.eq(1).hide():$btn.eq(1).show();
            $ul.stop().animate({
                marginLeft: -width*parent.index
            },400)
        })
    })
}()
// 平安之旅 主角
!function(){
    var $mainContent=$('#mainContent'),
        $botton=$mainContent.find('.button'),
        $showBox=$mainContent.find('.showBox>div'),
        $zhujueList=$mainContent.find('.zhujueList'),
        $btn=$zhujueList.find('.zhujueTab .leftBtn'),
        $pic=$zhujueList.find('.zhujueContent .pic');
    $showBox.eq(0).show();
    // 平安之旅标题切换
    $botton.click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        $showBox.eq($(this).index('.button')).fadeIn().siblings().fadeOut();
    })
    // 主角图片切换
    $btn.click(function(){
        var index=$(this).index();
        console.log(index)
        $(this).addClass('border').siblings().removeClass('border');
        $pic.eq(index).addClass('show').siblings().removeClass('show');
    })
}()

// 攻略部分 (strategy)
!function(){
    var $strategy=$('#strategy'),
        $bannerBox=$strategy.find('.bannerBox'),
        $aBanner=$bannerBox.find('.autoBanner .aBannerBox'),
        $aPic=$aBanner.find('.picWrap'),
        $aPicli=$aPic.find('.pic'),
        $aTab=$aBanner.find('.botTab span'),

        $mBanner=$bannerBox.find('.manulBanner'),
        $mTab=$mBanner.find('.tab .btn'),
        $mPic=$mBanner.find('.listBox'),
        $mUl=$mPic.find('.listItem')
        ;
    //自动轮播
    var aBanner=new Banr2($aPic,$aPicli,$aTab,$aBanner);
    aBanner.exe();

    // 生成手动轮播的内容 (数据处理)
    var typeArr=["新手","式神","斗技","玩法","御魂","高阶"];
    $mUl.each(function(i){
        for(var j=0,length=strategyData.length; j<length; j++){
            var data=strategyData[j],
                reg=new RegExp(i-1);
            if( !i || reg.test(strategyData[j].type) ){
                var index=!i?data.type.charAt(data.type.length-1):i-1;
                $(this).append('<li><a href="#">\
                                    <i class="arrow"></i>\
                                    <p class='+"title"+">【"+typeArr[index]+"】 "+data.title+'</p>\
                                    <p class="author">作者：'+data.author+'</p>\
                                </a></li>');
            }
        }
    })
    // 手动轮播
    var mBanner=new Banr($mPic,$mUl,$mTab);
    mBanner.exe();
}()
// 同人专区
!function(){
    var $sameFan=$('#sameFan'),
        $tab=$sameFan.find('.tabBox .tabUl .btn'),
        $pic=$sameFan.find('.picBox .picWrap');

    // 添加数据
    for(var i=0; i<6; i++){
        var $ul=$('<ul></ul>');
        for(var j=0,length=fandata.length; j<length; j++){
            if(fandata[j].type==i){
                $ul.append('<li>\
                                <a class="img" href="#">\
                                <img src='+fandata[j].url+' alt="img">\
                                <span><b></b></span>\
                                </a>\
                                <p class="txt">'+fandata[j].title+'</p>\
                            </li>')
            }
        }
        $pic.append($ul)
    }
    var $picLi=$pic.find('ul');

    var banner=new Banr($pic,$picLi,$tab)
    banner.exe();
}()

// 活动专区 返回顶部
!function(){
    // html=document.documentElement
    var $backTop=$('#backTop');
    $backTop.click(function(){
        $('body,html').animate({
            scrollTop: 0
        })
    })
}()



































