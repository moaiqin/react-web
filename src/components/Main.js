require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

//let yeomanImage = require('../images/yeoman.png');//获取图片地址

//获取图片相关的数组
let imagesData = require('../data/imageData.json');

 imagesData=(function getImageUrl(imagesData){
	for(var i=0,j=imagesData.length; i<j ;i++){
		var imageSingleData=imagesData[i];
		imageSingleData.imageUrl=require('../images/'+imageSingleData.filename);
		imagesData[i]=imageSingleData;
	}
	return imagesData;
})(imagesData);

class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
         <section className="image-sec">
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
