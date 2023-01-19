import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Tooltip, Toolbar, Typography, Button, AppBar } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import OutletRoundedIcon from "@mui/icons-material/OutletRounded";
import SentimentVeryDissatisfiedRoundedIcon from "@mui/icons-material/SentimentVeryDissatisfiedRounded";
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";
import RefreshIcon from "@mui/icons-material/Refresh";
import axios from "axios";

function TopBar({ data, setData }) {
	const [refreshIsActive, setRefreshIsActive] = useState(true);
	const [intervalId, setIntervalId] = useState(0);

	useEffect(() => {
		// Déclenche fetchData + auto refresh
		if (refreshIsActive) {
			const id = setInterval(() => {
				axios
					.get(`http://localhost:3080/posts`, {})
					.then((response) => {
						setData(response.data);
					})
					.catch((err) => err);
			}, 2000);
			setIntervalId(id);
		} else {
			clearInterval(intervalId);
		}
	}, [refreshIsActive]);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						Facebook API Graph
					</Typography>
					<Tooltip title={refreshIsActive ? "Actualisation automatique des données activée." : "Actualisation automatique des données désactivée."}>
						<Button
							variant='outlined'
							size='small'
							color={refreshIsActive ? "success" : "warning"}
							startIcon={<RefreshIcon />}
							onClick={() => {
								setRefreshIsActive(!refreshIsActive);
							}}
						>
							Actualisation
						</Button>
					</Tooltip>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

function App() {
	const [data, setData] = useState([]);

	return (
		<>
			<TopBar data={data} setData={setData} />

			<Box padding={5}>
				<TableContainer component={Paper}>
					<Table aria-label='Facebook data table'>
						<TableHead>
							<TableRow>
								<Tooltip title='Le contenu du message publié sur la page facebook'>
									<TableCell align='center'>Message</TableCell>
								</Tooltip>
								<Tooltip title="Date de création de l'article" sx={{ minWidth: 175 }}>
									<TableCell align='center'>Date de création</TableCell>
								</Tooltip>
								<Tooltip title='Nombre de fois où la publication de votre Page s’est affichée sur l’écran d’une personne. Les publications incluent les statuts, les photos, les liens, les vidéos et plus encore.'>
									<TableCell align='center'>Impression</TableCell>
								</Tooltip>
								<TableCell align='center'>
									<Tooltip title="J'aime">
										<ThumbUpIcon color='primary' />
									</Tooltip>
								</TableCell>
								<TableCell align='center'>
									<Tooltip title="J'adore">
										<FavoriteIcon color='error' />
									</Tooltip>
								</TableCell>
								<TableCell align='center'>
									<Tooltip title='Grrr'>
										<SentimentVeryDissatisfiedRoundedIcon color='error' />
									</Tooltip>
								</TableCell>
								<TableCell align='center'>
									<Tooltip title='Triste'>
										<SentimentDissatisfiedRoundedIcon color='warning' />
									</Tooltip>
								</TableCell>
								<TableCell align='center'>
									<Tooltip title='Wouah'>
										<OutletRoundedIcon color='warning' />
									</Tooltip>
								</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{data.map((row) => (
								<TableRow
									hover
									key={row.id}
									sx={{
										"&:last-child td, &:last-child th": {
											border: 0,
										},
									}}
								>
									<TableCell component='th' scope='row'>
										{row.message}
									</TableCell>
									<TableCell align='center' sx={{ minWidth: 175 }}>
										{row.createdAt}
									</TableCell>
									<TableCell align='center'>{row.postImpressions}</TableCell>
									<TableCell align='center'>{row.postReactionsByTypeTotal.like || 0}</TableCell>
									<TableCell align='center'>{row.postReactionsByTypeTotal.love || 0}</TableCell>
									<TableCell align='center'>{row.postReactionsByTypeTotal.anger || 0}</TableCell>
									<TableCell align='center'>{row.postReactionsByTypeTotal.sorry || 0}</TableCell>
									<TableCell align='center'>{row.postReactionsByTypeTotal.wow || 0}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</>
	);
}

export default App;
