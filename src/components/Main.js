require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

//let yeomanImage = require('../images/yeoman.png');//获取图片地址

//获取图片相关的数组
let imagesData = require('../data/imageData.json');

 imagesData=((imagesData) => {
	for(var i=0,j=imagesData.length; i<j ;i++){
		var imageSingleData=imagesData[i];
		imageSingleData.imageUrl=require('../images/'+imageSingleData.filename);
		imagesData[i]=imageSingleData;
	}
	return imagesData;
})(imagesData);

var getRandomPos = (low,height) =>{
	return Math.ceil(Math.random()*(height-low)+low);
}

class ImgFigure extends  React.Component {
  constructor (props){
    super(props);
  }
	render (){
		var styleObj={};
		//看状态中是否有指定de值
		if(this.props.arrange.pos){
			styleObj = this.props.arrange.pos;
		}

		return (
			  <figure className="img-figure" style={ styleObj }>
			     <img src={this.props.data.imageUrl}
			        alt={this.props.title}
			     />
			     <figcaption>
			     <h2 className="img-title">{this.props.data.desc}</h2>
			     </figcaption>
			  </figure>
			);
	}
}
class AppComponent extends React.Component {
  constructor (props){
    super(props);
    this.Constant = {
       centerPos:{
         left:0,
         right:0
       },
       hPosRange:{//水平方向de取值范围
         leftSecx:[0,0],
         rightSecx:[0,0],
         y:[0,0]
       },
       vPosRange:{//垂直方向de取值范围
         x:[0,0],
         topY:[0,0]
       }
    };

    this.state={
      imgsArrangeArr:[
        /*{
          pos:{
            left:0,
            top:0
          }
        }*/
      ]
    };
  }
  
  //重新布局所有突变
  rearrange (centerIndex){

  	var imgsArrangeArr=this.state.imgsArrangeArr,
  	    Constant = this.Constant,
  	    centerPos = Constant.centerPos,
  	    hPosRange = Constant.hPosRange,
  	    vPosRange = Constant.vPosRange,
  	    hPosRangeLeftSecx = hPosRange.leftSecx,
  	    hPosRangeRightSecx= hPosRange.rightSecx,
  	    hPosRangeY = hPosRange.y,
  	    vPosRangeTopY = vPosRange.topY,
  	    vPosRangeX = vPosRange.x,

  	    imgsArrangeTopArr = [],
  	    topImgNum = Math.ceil(Math.random()*2),
  	    imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);

  	    //首先居中centerindexde图片
  	    imgsArrangeCenterArr[0].pos = centerPos;
  	var topImgSpliceIndex = Math.ceil(Math.random()*(imgsArrangeArr.length-topImgNum));
  	var imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);
  	    //布局位于上则的图片
  	    imgsArrangeTopArr.forEach(function(value,index){
  	    	imgsArrangeTopArr[index].pos={
  	    		top:getRandomPos(vPosRangeTopY[0],vPosRangeTopY[1]),
  	    		left:getRandomPos(vPosRangeX[0],vPosRangeX[1])
  	    	}
  	    });

  	    //布局两边de突变
  	    for(var i=0,j=imgsArrangeArr.length,k = j / 2; i < j; i++){
  	    	var hPosLorR = null;

  	    	if(i < k){
  	    		hPosLorR = hPosRangeLeftSecx;
  	    	}else{
  	    		hPosLorR = hPosRangeRightSecx;
  	    	}
  	    	imgsArrangeArr[i].pos={
  	    		top: getRandomPos(hPosRangeY[0],hPosRangeY[1]),
  	    		left:getRandomPos(hPosLorR[0],hPosLorR[1])
  	    	}
  	    }

  	    if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
  	    	imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
  	    }

  	    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
  	    this.setState({
  	    	imgsArrangeArr:imgsArrangeArr
  	    });
  }
  //组件加载后，为每张图片计算相应de位置
  componentDidMount (){
  	//首先拿到舞台de大小
    //alert(this.refs.imgFigure1.scrollWidth)
  	//var stageDom = React.findDOMNode(this.refs.stage),
  	let stageW = this.refs.stage.scrollWidth,
  	    stageH = this.refs.stage.scrollHeight,
  	    halfStageW = Math.ceil(stageW/2),
  	    halfStageH= Math.ceil(stageH/2);
  	let imgFigureDom = ReactDOM.findDOMNode(this.refs.imgFigure0),
  	    imgW = imgFigureDom.scrollWidth,
  	    imgH = imgFigureDom.scrollHeight,
  	    halfImgW = Math.ceil(imgW/2),
  	    halfImgH = Math.ceil(imgH/2);
      
  	//计算中心图片的位置
  	this.Constant.centerPos = {
  		left:halfStageW - halfImgW,
  	  top:halfStageH - halfImgH
  	}

  	this.Constant.hPosRange.leftSecx[0] = -halfImgW;
  	this.Constant.hPosRange.leftSecx[1] = halfStageW - halfImgW*3;
  	this.Constant.hPosRange.rightSecx[0] = halfStageW + halfImgW*4/3;
  	this.Constant.hPosRange.rightSecx[1] = stageW - halfImgW;
  	this.Constant.hPosRange.y[0] = -halfImgH;
  	this.Constant.hPosRange.y[1] = stageH - halfImgH;

  	this.Constant.vPosRange.topY[0] = -halfImgH;
  	this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
  	this.Constant.vPosRange.x[0] = halfStageW - halfImgW;
  	this.Constant.vPosRange.x[1] = halfStageW;

  	this.rearrange(0);

  }
  render (){
  	  //let controllerUnits=[];
      let imgFigures=[];
      
      imagesData.forEach(function(value,index){
         if(!this.state.imgsArrangeArr[index]){
         	this.state.imgsArrangeArr[index]={
         		pos:{
         			left:0,
         			top:0
         		}
         	}
         }
         imgFigures.push(<ImgFigure data={value} key={index} className="test" ref={'imgFigure'+index} arrange={this.state.imgsArrangeArr[index]}/>);
      }.bind(this));
    return (
      <section className="stage" ref="stage">
         <section className="image-sec">
            {imgFigures}
         </section>
         <nav className="controller-nav">
         </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
