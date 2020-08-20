var wordArray = [
  '嘴甜是因为心甜，心甜是因为里面有你。',
  '你的眼睛真好看。不过没我的好看，因为我的眼睛里面全是你。',
  '你今天怪怪的。怪好看的。',
  '你今天特别讨厌。讨人喜欢和百看不厌。',
  '我怀疑你是碳酸饮料。因为一遇见你，我就开心地冒泡泡。',
  '众生皆苦，而你是草莓味。',
  '愿你出走半生，归来仍是少年。',
  '希望吹过我的风，还能绕几圈去拥抱你。',
  '我在人间贩卖黄昏，只为收集世间的温柔去见你。',
  '你可以笑一个吗？刚刚我的咖啡忘记加糖了。',
 ' 我是九你是三，除了你还是你。',
  '我觉得咱俩挺过分的，你过分美丽，我过分着迷。',
  '你和星星的区别就是，星星在天上，你在我心里。',
  '喜欢你是件很麻烦的事，我偏偏爱找麻烦。',
  '在有你的选择里，我都选择你。',
  '你是年少的欢喜 这句话反过来也是你。',
  '我看过很多书，但都没有你好看。',
  '你这种人，我除了恋爱跟你也没什么好谈的。',
  '我只有两个心愿：你在身边，在你身边。',
  '自从遇见你，人生苦短，甜长。',
  '我已见过银河，但我仍只爱你这一颗星。',
  '有谣言说我喜欢你，今天我澄清一下，这不是谣言。',
  '无一爱字，句句深情。',
  '这城市人来人往，向我迎面而来，又与我擦肩而过的，都像你。',
  '把对你的相思酿成酒，十里外的野猫都醉了。',
  '以你作诗，半字成痴，故我落笔迟迟。',
  '十里长街，走马一程，全都是你。',
  '人生不如意十之八九你是一二。',
  '写尽千山，落笔是你。',
  '夜是灯火不休，你是我的爱至江愁。',
  '浮生万物，我最喜欢你。',
  '山野千里，你是我藏在微风中的欢喜。',
  '我喜欢你，胜于昨日，略匮明朝。',
  '我不善于旅行，你就是我的整个世界。',
  '山河远阔，人间烟火，无一是你，无一不是你。',
  '遇见你，从此凛冬散尽，星河长明。',
  '我喜欢你，岂止是狼子野心，是贼心不改。',
  '夏天恋爱，秋天私奔，如果有空，冬天陪我过冬。',
  '我喜欢春天的花，夏天的风，秋天的黄昏，冬日的太阳，还有每天的你。',
  '梦想的生活有一百种，种种都有你。',
  '从遇见你开始，我才发现，明天和惊喜都变得重要。'
]

// 修复切换背景图时出现的“白色闪屏”现象
function changeBackground(num) {
  var index = '#img' + num
  var imgnum = $(index)
  imgnum.toggleClass("block");
}
 // 文字处理
 function wordDeal() {
  var wordNum = Math.round(Math.random()*41);
  var showWord = wordArray[wordNum]
  var wordarr = showWord.split('。')
  var words = wordarr.slice(0,wordarr.length - 1)
  console.log(words)
  for (var i = 0; i < words.length; i++ ){
    var valentineWordItem1 = $("<div>"); 
    valentineWordItem1.attr('id', 'valentineWordItem' + (i + 1)) 
    valentineWordItem1.html(words[i]+'。')
    $("#valentineWord").prepend(valentineWordItem1); 
  }
  $("#valentineWord").fadeIn("slow");
}

// 信纸展开
function startAnimate() {
  changeBackground(2)
    $('#envelopeMove').show()
    $('#envelopeMove').css("height","55vh");
    setTimeout(function() {
      $('#envelopeMove').hide()
      changeBackground(3)
      wordDeal();
    }, 2000);
}

//开始播放音乐
 function playMusic() {
   console.log(444)
  let context = new (window.AudioContext || window.webkitAudioContext)();
  request('../style/audio/audio.mp3')
  .then((audioMedia) => {
    context.decodeAudioData(audioMedia, decode => play(context, decode));
  })
  .catch(err => {
    console.log(`request audio error:`,err)
  })
  
}

//默认播放音乐
function play (context, decodeBuffer) {
  let source = context.createBufferSource();
  source.buffer = decodeBuffer;
  source.connect(context.destination);
  // 从0s开始播放
  source.start(0);
}

// ajax请求
function request (url) {
  return new Promise (resolve => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      // 这里需要设置xhr response的格式为arraybuffer
      // 否则默认是二进制的文本格式
      xhr.responseType = 'arraybuffer';
      xhr.onreadystatechange = function () {
          // 请求完成，并且成功
          if (xhr.readyState === 4 && xhr.status === 200) {
              resolve(xhr.response);
          }
      };
      xhr.send();
  });
}

$(document).ready(function(){
  // autoPlayMusic();
  playMusic();
  $('#envelopeMove').hide()
  $('#valentineWord').hide()
  changeBackground(1)
  setTimeout( () => {
    startAnimate()
  },1000)
});

document.addEventListener('DOMContentLoaded', function () {
  console.log(123)
  function audioAutoPlay() {
    console.log(321)
    playMusic()
      document.addEventListener("WeixinJSBridgeReady", function () {
        playMusic()
      }, false);
  }
  audioAutoPlay();
});

// ios
function autoPlayMusic() {
  // 自动播放音乐效果，解决浏览器或者APP自动播放问题
  function musicInBrowserHandler() {
      playMusic()
      document.body.removeEventListener('touchstart', musicInBrowserHandler);
  }
  document.body.addEventListener('touchstart', musicInBrowserHandler);

  // 自动播放音乐效果，解决微信自动播放问题
  function musicInWeixinHandler() {
      playMusic()
      document.addEventListener("WeixinJSBridgeReady", function () {
          playMusic()
      }, false);
      document.removeEventListener('DOMContentLoaded', musicInWeixinHandler);
  }
  document.addEventListener('DOMContentLoaded', musicInWeixinHandler);
}

