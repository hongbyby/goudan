/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-06-06 15:36:17
 * @version $Id$
 */
/* jq里面是没有滚轮事件的,非常尴尬 */

// 首屏动画
!function(){
    var $wSlide=$('#wrap').find('.wSlide'),
        $eSlide=$('#wrap').find('.mask'),
        $slide3=$('#centerWrap').find('.slide3'),
        $slide4=$('#centerWrap').find('.slide4');
    // 滑块一的动画
    $wSlide.delay(800).animate({
        left:29,
        opacity: 1
    },1000)
    // 滑块二的动画
    $eSlide.delay(800).animate({
        right: 25,
        opacity: 1
    },1000)
    // 滑块三的动画
    $slide3.animate({
        top: 77,
        opacity:1
    },1000)
    // 滑块四的动画
    $slide4.animate({
        top:624,
        opacity:1
    },1000)
}()
// 视屏弹窗
!function(){
    var $btn=$('#centerWrap').find('.video-link'),
        $video_pop=$('.video-pop'),
        $close=$video_pop.find('.close'),
        $body=$('body');
    $btn.click(function(){
        $video_pop.show();
        $body.css('overflow-y','hidden')
    })
    $close.click(function(){
        $video_pop.hide();
        $body.css('overflow-y','auto')
    })
}()

// 新版本详情弹出层
!function(){
    // 显示隐藏
    var $newinfo=$('#newinfo'),
        $txtbox=$('#newinfo').find('.textwrap'),
        $txtbox_Height=$txtbox.height(),

        $title=$newinfo.find('.main .title'),
        $infolist=$newinfo.find('.infoList li'),
        $pop=$newinfo.find('.popwindow'),
        $popli=$pop.find('.content li'),
        $popclose=$pop.find('.closeBtn'),
        $btn=$pop.find('.btn'),
        index,
        Length=$popli.length;

    // 滚动延迟显示


    // 点击显示全屏窗口
    $infolist.click(function(){
        $('body').css('overflow','hidden')
        index=$(this).index();
        $pop.show();
        $popli.eq(index).show().siblings().hide();
    })
    // 点击隐藏全屏窗口
    $popclose.click(function(){
        $('body').css('overflow','auto')
        var index=$(this).index();
        $pop.hide();
    })
    // 左右切换按钮
    $btn.click(function(){
        if( $(this).index('.content .btn') ){
            index++;
            index%=Length;
        }else{
            index--;
            if(index<0) index=Length-1;
        }
        $popli.eq(index).show().siblings().hide();
    })

    // 自定义滚动条
    $txtbox.each(function(){
        var $text=$(this).find('.text'),
            $scroll=$(this).find('.scroll'),
            $scrollbar=$(this).find('.scrollbar'),
            $text_Height=$text.height(),
            bar_height=$txtbox_Height*$txtbox_Height/$text_Height;
        $scrollbar.height(bar_height);   // 设定黑色滚动条的高
        var maxbarTop=$txtbox_Height-$scrollbar.height();
        // 鼠标按下拖动
        $scrollbar.mousedown(function(e){
            var $this=$(this),
                sY=e.clientY,
                sTop=$(this).position().top,
                $text=$(this).parent().siblings(),
                maxtextTop=$text.height()-$txtbox_Height;
            // console.log(sTop)
            $(document).mousemove(function(e){
                var nY=e.clientY,
                    Top=sTop+nY-sY,
                    textTop=Top/maxbarTop*($text.height()-$txtbox_Height);
                // console.log(maxbarTop)
                Top=Math.max(Top,0);
                Top=Math.min(Top,maxbarTop);
                textTop=Math.max(textTop,0);
                textTop=Math.min(textTop,maxtextTop);
                $this.css('top',Top);
                $text.css('top',-textTop);
                return false;
            }).mouseup(function(){
                $(this).off('mousemove').off('mouseup');
            })
        })
        // 鼠标滚轮事件
        $(this).mousewheel(function(e,d){
            var speed=d*30,
                Top=$text.position().top+speed;
            Top=Math.max(Top,-$text_Height+$txtbox_Height);
            Top=Math.min(Top,0);
            $text.css('top',Top);
            $scrollbar.css('top',-(Top/($text_Height-$txtbox_Height)*maxbarTop));
            return false;
        })
        // 点击滚动条跳动
        $scroll.click(function(e){
            if(e.target===this){
                var y=e.clientY-($(this).offset().top-$(document).scrollTop()),
                    Top=$scrollbar.position().top;
                Top=y>Top?Top+100:Top-100;
                Top=Math.max(Top,0);
                Top=Math.min(Top,maxbarTop);
                var textTop=-Top/maxbarTop*($text.height()-$txtbox_Height);
                $scrollbar.animate({top:Top},500);
                $text.animate({top:textTop},500);
                //console.log($(this)[0].offsetLeft)
            }
        });
    })
    $pop.hide().css('opacity',1);
}()


// 游戏特色轮播
!function(){
    var $game=$('#game'),
        $picli=$game.find('.banner li'),
        $btn=$game.find('.click .btn'),
        index=0,
        Length=$picli.length;

    $picli.click(function(){
        if($(this).index()!==index){
            index=$(this).index();
            change();
        }
    });
    $btn.click(function(){
        if( $(this).index() ){
            index+=1;
            if(index>=Length) index=0;
        }else{
            index-=1;
            if(index<0) index=Length-1;
        }
        change();
    });
    function change(){
        var Lindex=index-1,
            Rindex=index+1;
        if(Lindex<0)Lindex=Length-1;
        if(Rindex>=Length)Rindex=0;
        $picli.removeClass('mid left right');
        $picli.eq(Lindex).addClass('left');
        $picli.eq(Rindex).addClass('right');
        $picli.eq(index).addClass('mid');
    }
}()





