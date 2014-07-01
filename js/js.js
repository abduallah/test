var xposition= new Array();
var myPage;
var clicked=false;
var firstAnimate=true;
var subNews="";
var ximg = new Array(-139,0,-350,0 , 0,0,-37,-83);
var yimg = new Array( 0 , 0, 0 , -29,0,0,0 , 0);
var scrollCounter=0;
var y;

function page(header,content,image,id,href)
{
this.header=header;
this.content=content;
this.image=image;
this.id=id;
this.href=href;
}
page.prototype.apply= function()
{
	var imgIndex=getIDNumber(this.id)-4;
 
 	
 
 
 
	
	if(!this.href)
	{
		this.href= $("#"+this.id).children("a:first").attr("href");
		setHash(this.href);
	}

	this.href=this.href.replace("#","");
	
		$("#pageBody").load("ElasticContentSlider/index.html");
 
	//$("#pageContent").attr('src',this.image);
}

function hashRedir()
{
	if(!getHash())return;
	var tags= new Array();
	tags["firm-profile"]="#menu-item-4";
	tags["practice-areas-services"]="#menu-item-5";
	tags["lawyers"]="#menu-item-6";
	tags["clients"]="#menu-item-7";
	tags["associated-businesses"]="#menu-item-8";
	tags["careers"]="#menu-item-9";
	tags["news"]="#menu-item-10";
	tags["contact-us"]="#menu-item-11";
	
	
		setTimeout(function()
		{
			if(tags[getHash()])
			{
				var bk=$(tags[getHash()]).css('background-image');
				$(tags[getHash()]).css('background-image',bk.replace("gray/",""));
				$(tags[getHash()]).click();
			}
			else
			{
				subNews=getHash();
				setHash(subNews);
				$("#menu-item-10").click();
			}
		},2000);

		
}

function getPosition(ore) {
	//y=parseInt(ore.substring(ore.indexOf("px")+1, ore.lastIndexOf("px")));
	y=parseInt(ore.substring(ore.indexOf("px")+2, ore.lastIndexOf("px")));
	return parseInt(ore.substring(0, ore.indexOf("px")));
}
function getIDNumber(filename) {
	return parseInt(filename.substring(filename.lastIndexOf("-") + 1, filename.lastIndexOf("-") + 3));
}
function boldIt()
{
	var $p = $("#pageHeader");
	if($p.html().indexOf(" ") == -1)
		return;
	$p.html($p.html().replace(/^(\w+)/, '<b>$1</b>'));

}
function showNews(target)
{
	if(!$(target).attr("newsID")) return;
	subNews=$(target).attr("newsID");
	setHash(subNews);

	$("#menu-item-10").click();
	
	
}
function setHash(val)
{
	window.location.hash = val;
}
function getHash()
{
	var url=window.location.hash
    return url.substring(1);
}
function extractUrl(input)
{
 // remove quotes and wrapping url()
 return input;
 return input.replace(/"/g,"").replace(/url\(|\)$/ig, "");
}
function changePage()
{
	$("#pageImage").animate({'height':'0','width':'0'},500);
}
$(document).ready(function(){
  $("#backBtn").click(function() {
  $("#menu-item-10").click();
});
   $('#news').innerfade({
      animationtype: 'fade',
      speed: 1000,
      timeout: 3000,
      containerheight: '10px'
	});
  $("#pageHeader").change(function() {
  alert('Handler for .change() called.');
});
  var fadeInTime=true;
  fadeInOneByOne(4);

  $(".mainmenu li").hover(function(){
if(fadeInTime)return;
  var x;
  if(isIE)
  {
	x=$(this).css('background-position-x');
	y=$(this).css('background-position-y');
  }
  else
	x=getPosition($(this).css('background-position'));
  if(!y)y=0;
  x-=80;
  if(clicked)return;
  
  if(isIE)
	$(this).stop().animate({
 'background-position-x': '-=80'
  }, 3000 );
  else
  $(this).stop().animate({
 backgroundPosition: x+'px '+y+'px'
  }, 3000 );
  
  });
  
  $(".mainmenu li").mouseout(function(){
  if(clicked || fadeInTime)return;
  var pos=xposition[$(this).attr('id')];
  if(isIE)
  {
	$(this).stop().css('background-position-x',pos);
  }
  else
	$(this).stop().css('background-position',pos+'px '+y+"px");
  });
  
  $(".mainmenu li").each(function(index) {
	if(isIE)
		xposition[$(this).attr('id')]=$(this).css('background-position-x');
	else
		xposition[$(this).attr('id')]=getPosition($(this).css('background-position'));
  });
  
  $(".mainmenu li").click(function(){
	clicked=true;
	if(!myPage)
	   fadeOneByOne(4);
	myPage= new page($(this).children("a:first").text(),"",extractUrl($(this).css("background-image")),$(this).attr("id"));
	$(".mainmenu li a").each(function(index) {
		$(this).attr('class','');
	});
	$(this).children().attr('class','selected');
	myPage.apply();

  });
  
  function fadeOneByOne(dex)
  {
	if(dex!=12)
	  $("#menu-item-"+dex).stop().animate({'height':'42'},150,function(){fadeOneByOne(++dex);});
	else
		pageStarter();
  }
  function fadeInOneByOne(dex)
  {
	if(dex!=12)
	  $("#menu-item-"+dex).fadeIn(300,function(){fadeInOneByOne(++dex);});
	else
	  fadeInTime=false;
  }
  function pageStarter()
  {
   
	 
	$("#pageBody").fadeIn(500,function(){})	;

  }
hashRedir();
});

  function scrollIt()
  {
 
  $(".pageContent").mCustomScrollbar({
	scrollButtons:{enable:true}
	});
	 $("#loading").fadeOut(200,function(){$("#loading").fadeOut(200);});
  }
  
 