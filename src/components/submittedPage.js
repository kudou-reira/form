import React, { Component } from 'react';
import { css } from 'emotion';


const containerItem = css`
	margin-top: 1%;
	margin:0 auto;
	width: 35%;
`

const marginTitle = css`
  margin-top: 2%;
`

class SubmittedPage extends Component {
	render() {
		return(
			<div className={marginTitle}>
				<div className={containerItem}>
					<p>
						Your order details have been submitted.
					</p>
					<p>
					  Check the console for output.
					</p>
				</div>
			</div>
		);
	}
}

export default SubmittedPage;