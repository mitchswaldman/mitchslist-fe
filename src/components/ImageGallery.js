import React from 'react'

export default class ImageGallery extends React.Component {
	state = {curPhotoIdx: 0}
	selectPhoto = (index) => {
		this.setState({
			curPhotoIdx: index
		})
	}
	render() {
		const { photos = [] } = this.props 
		const { curPhotoIdx } = this.state
		return (
			<React.Fragment>
			{photos && photos.length > 0 &&
				<figure className="iw multiimage">
					<div className="gallery">
						<div className="swipe">
							<div className="swipe-wrap">
								<div className="slide first visible">
									<img src={photos[curPhotoIdx].image}/>
								</div>
							</div>
						</div>
					</div>
					<div id="thumbs">
						{photos.map((photo, index) => {
							return (
								<a class="thumb hoverZoomLink" onClick={() => this.selectPhoto(index)} onMouseEnter={() => this.selectPhoto(index)}>
									<img src={photo.image} className={index === curPhotoIdx ? 'selected' : ''}/>
								</a>
							)
						})}
					</div>
				</figure>}
				</React.Fragment>
		)
	}
}