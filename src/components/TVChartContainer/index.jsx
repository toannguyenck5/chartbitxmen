import * as React from 'react';
import './index.css';
import Datafeed from './api/'


function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(window.location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

export class TVChartContainer extends React.PureComponent {

	static defaultProps = {
		// symbol: 'Coinbase:BTC/USD',
		// symbol: 'Bitxmen:BTC/VND',
		symbol: (window.location.href.split("?")[1] == undefined ? "BTC" : window.location.href.split("?")[1]),
		interval: 'D', // thời gian giữa 2 nến
		containerId: 'tv_chart_container',
		libraryPath: '/charting_library/',
		chartsStorageUrl: 'https://saveload.tradingview.com',
		chartsStorageApiVersion: '1.1',
		clientId: 'tradingview.com',
		userId: 'public_user_id',
		fullscreen: true,
		autosize: true,
		studiesOverrides: {},
	};

	componentDidMount() {
		const widgetOptions = {
			debug: false,
			symbol: this.props.symbol,
			datafeed: Datafeed,
			interval: this.props.interval,
			container_id: this.props.containerId,
			library_path: this.props.libraryPath,
			locale: getLanguageFromURL() || 'vi',
			disabled_features: ['use_localstorage_for_settings'],
			enabled_features: ['study_templates'],
			charts_storage_url: this.props.chartsStorageUrl,
			charts_storage_api_version: this.props.chartsStorageApiVersion,
			client_id: this.props.clientId,
			user_id: this.props.userId,
			fullscreen: this.props.fullscreen,
			autosize: this.props.autosize,
			studies_overrides: this.props.studiesOverrides,
			timezone: "Asia/Bangkok",

			numeric_formatting: { decimal_sign: "." },
			customFormatters: {
				// timeFormatter: {
				// 	format: function (date) { var _format_str = '%h:%m'; return _format_str.replace('%h', date.getUTCHours(), 2).replace('%m', date.getUTCMinutes(), 2).replace('%s', date.getUTCSeconds(), 2); }
				// },
				dateFormatter: {
					format: function (date) { 
						let month = date.getUTCMonth() + 1 < 10 ? '0' + parseInt(date.getUTCMonth() + 1) : date.getUTCMonth() + 1
						let day = date.getUTCDate() < 10 ? '0' + date.getUTCDate() : date.getUTCDate()
						return day + '-' + month + '-' + date.getUTCFullYear() 
					}
				}
			},
			time_frames: [
				// { text: "50y", resolution: "6M", description: "50 Years" },
				// { text: "3y", resolution: "W", description: "3 Years", title: "3yr" },
				// { text: "8m", resolution: "D", description: "8 Month" },
				// { text: "3d", resolution: "5", description: "3 Days" },
				// { text: "1000y", resolution: "W", description: "All", title: "All" },
			],
			loading_screen: { backgroundColor: "#000000" },
			overrides: {
				// "paneProperties.crossHairProperties.width": "1",
				"volumePaneSize": "large",
				// "mainSeriesProperties.showCountdown": true,
				// "paneProperties.rightAxisProperties.percentage":false,
				"paneProperties.background": "#131722",
				"paneProperties.vertGridProperties.color": "#363c4e",
				"paneProperties.horzGridProperties.color": "#363c4e",
				"paneProperties.legendProperties.showSeriesOHLC": true,
				//"paneProperties.legendProperties.showSeriesTitles": false,
				// "symbolWatermarkProperties.transparency": 90,
				// "symbolWatermarkProperties.color" : "#944",
				"scalesProperties.textColor": "#AAA",
				"mainSeriesProperties.candleStyle.wickUpColor": '#336854',
				"mainSeriesProperties.candleStyle.wickDownColor": '#7f323f',
				"mainSeriesProperties.style": 1,
			}
		};

		window.TradingView.onready(() => {
			const widget = window.tvWidget = new window.TradingView.widget(widgetOptions);

			widget.onChartReady(() => {
				console.log('Chart has loaded!')
			});
		});
	}

	render() {
		return (
			<div
				id={this.props.containerId}
				className={'TVChartContainer'}
			/>
		);
	}
}
