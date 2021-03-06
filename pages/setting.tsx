import * as React from "react";
import Link from "next/link";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AssistantIcon from "@material-ui/icons/Assistant";
import BrushSharpIcon from "@material-ui/icons/BrushSharp";
import EmojiFoodBeverageIcon from "@material-ui/icons/EmojiFoodBeverage";
import GroupIcon from "@material-ui/icons/Group";
import PersonIcon from "@material-ui/icons/Person";
import TwitterIcon from "@material-ui/icons/Twitter";

// FIXME crash on mobile devices

export async function getStaticProps({ locale }) {

	const pageDic = require("../data/i18n/" + locale + "/page.js")["/setting"];

	const { title } = pageDic;

	return {
		props: {
			currentPage: {
				title,
				path: "/setting",
			},
			locale,
			pageDic,
		},
	};
}

const LinkList = function ({ link, Icon, primary, secondary }) {
	return (
		<Link key={link} href={link} passHref>
			<ListItem component={"a"} button>
				{Icon && <ListItemIcon>{Icon}</ListItemIcon>}
				<ListItemText secondary={secondary} primary={primary} />
			</ListItem>
		</Link>
	);
};

interface ISetting {
	homeShowNewestTool: boolean;
	hitokotoTopic: number;
	theme: number;
}

function updateSetting<T extends keyof ISetting>(
	name?: T,
	value?: any
): ISetting {
	var originSetting: ISetting = JSON.parse(
		(window && window.localStorage.getItem("setting")) || "{}"
	);
	if (!name) return originSetting;
	originSetting[name] = value;
	window.localStorage.setItem("setting", JSON.stringify(originSetting));
	// console.log(originSetting);
	return originSetting;
}

const hitokotoItems = [
	{
		name: "??????",
		value: "",
	},
	{
		name: "??????",
		value: "a",
	},
	{
		name: "??????",
		value: "b",
	},
	{
		name: "??????",
		value: "c",
	},
	{
		name: "??????",
		value: "d",
	},
	{
		name: "??????",
		value: "e",
	},
	{
		name: "??????",
		value: "f",
	},
	{
		name: "??????",
		value: "g",
	},
];

const themeItems = [
	{
		name: "????????????",
		value: "auto",
	},
	{
		name: "????????????",
		value: "light",
	},
	{
		name: "????????????",
		value: "dark",
	},
];

export default class Setting extends React.Component<
	{ handleNewPage: any },
	{
		setting: ISetting;
		privacy: string;
		showPrivacy: boolean;
		showSaying: boolean;
		showDonation: boolean;
		showTheme: boolean;
	}
> {
	constructor(props: Readonly<{ handleNewPage: any }>) {
		super(props);
		this.state = {
			setting: {
				hitokotoTopic: 1,
				theme: 1,
			},
			privacy: "",
			showPrivacy: false,
			showSaying: false,
			showDonation: false,
			showTheme: false,
		};
	}
	componentDidMount() {
		// window.setHeaderButton(null);
		this.setState({
			setting: updateSetting(),
		});
		// fetch(PrivacyPath.default)
		// 	.then((response) => {
		// 		return response.text();
		// 	})
		// 	.then((text) => {
		// 		this.setState({
		// 			privacy: text,
		// 		});
		// 	});
	}
	handleShowPrivacy = () => {
		this.setState({
			showPrivacy: true,
		});
	};
	handleShowDonation = () => {
		this.setState({
			showDonation: true,
		});
	};
	handleShowSaying = () => {
		this.setState({
			showSaying: true,
		});
	};
	handleShowTheme = () => {
		this.setState({
			showTheme: true,
		});
	};
	handleClose = () => {
		this.setState({
			showPrivacy: false,
			showDonation: false,
			showSaying: false,
			showTheme: false,
		});
	};
	render() {
		const { hitokotoTopic, theme } = this.state.setting;
		const { showSaying, showDonation, showTheme } = this.state;
		const { pageDic: d } = this.props;
		return (
			<Grid sm={9}>
				<Dialog
					onClose={this.handleClose}
					aria-labelledby="simple-dialog-title"
					open={showDonation}
				>
					<DialogTitle id="simple-dialog-title">
						?????????????????????
					</DialogTitle>
					<DialogContent>
						<Typography align="center" variant="body1">
							<img
								alt="DonationByScanning"
								width="200"
								height="200"
								src="/donation_vx.png"
							></img>
							<br />
							????????????????????????????????????
							??????????????????????????????????????????????????????
							???????????????????????????????????????????????????????????????
							????????????????????????????????????????????????
						</Typography>
					</DialogContent>
				</Dialog>
				<Dialog
					open={showSaying}
					aria-labelledby="saying preference"
					onClose={this.handleClose}
				>
					<DialogTitle>{d.hitokoto_source}</DialogTitle>
					<DialogContent>
						<FormGroup>
							{hitokotoItems.map((item, i) => (
								<FormControlLabel
									control={
										<Checkbox
											checked={hitokotoTopic === i}
											onChange={() => {
												this.setState({
													setting: updateSetting(
														"hitokotoTopic",
														i
													),
												});
											}}
											name="hitokotoTopic"
										/>
									}
									label={hitokotoItems[i].name}
								/>
							))}
						</FormGroup>
					</DialogContent>
				</Dialog>
				<Dialog
					open={showTheme}
					aria-labelledby="theme preference"
					onClose={this.handleClose}
				>
					<DialogTitle>??????</DialogTitle>
					<DialogContent>
						<FormGroup>
							{themeItems.map((item, i) => (
								<FormControlLabel
									key={item.value}
									control={
										<Checkbox
											checked={theme === i}
											onChange={() => {
												this.setState({
													setting: updateSetting(
														"theme",
														i
													),
												});
												window.snackbar({
													message:
														"??????????????????????????????????????????",
												});
											}}
											name="theme"
										/>
									}
									label={themeItems[i].name}
								/>
							))}
						</FormGroup>
					</DialogContent>
				</Dialog>
				<List
					component={Paper}
					subheader={
						<ListSubheader>
							{d.menu_customize_title}
						</ListSubheader>
					}
				>
					{[
						{
							onClick: this.handleShowSaying,
							primary: d.menu_hitokoto_source,
							secondary: hitokotoItems[hitokotoTopic].name,
							Icon: <AssistantIcon />,
						},
						{
							onClick: this.handleShowTheme,
							primary: d.menu_theme,
							secondary: themeItems[theme].name,
							Icon: <BrushSharpIcon />,
						},
					].map(({ onClick, primary, secondary, Icon }, i) => (
						<ListItem button onClick={onClick}>
							<ListItemIcon>{Icon}</ListItemIcon>
							<ListItemText
								primary={primary}
								secondary={secondary}
							/>
						</ListItem>
					))}
				</List>
				<br />

				<List
					component={Paper}
					subheader={
						<ListSubheader>
							{d.menu_contact_title}
						</ListSubheader>
					}
				>
					{[
						{
							primary: "???????????????",
							link: "https://wpa.qq.com/msgrd?v=3&amp;uin=1985386335&amp;site=qq&amp;menu=yes",
						},
					].map(LinkList)}
				</List>
				<br />
				<List
					component={Paper}
					subheader={
						<ListSubheader>{d.menu_donation}</ListSubheader>
					}
				>
					<ListItem button onClick={this.handleShowDonation}>
						<ListItemIcon>
							<EmojiFoodBeverageIcon />
						</ListItemIcon>
						<ListItemText primary="??????" />
					</ListItem>
					{[
						{
							link: "/privacy",
							primary: d.menu_privacy,
							Icon: <PersonIcon />,
						},
						{
							link: "https://jq.qq.com/?_wv=1027&amp;k=59hWPFs",
							primary: "????????????",
							Icon: <GroupIcon />,
						},
						{
							link: "https://weibo.com/u/7561197296/home",
							primary: "????????????",
							secondary: "???????????????????????????????????????~",
							Icon: <TwitterIcon />,
						},
					].map(LinkList)}
				</List>
				<br />
				<Typography
					variant="body2"
					color="textSecondary"
					align="center"
				>
					?? 2019 - 2021 RiverTwilight
				</Typography>
			</Grid>
		);
	}
}
