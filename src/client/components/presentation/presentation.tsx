import React from 'react';
import { useSync } from '@tldraw/sync' 
import { useParams } from 'react-router-dom';
import {
	AssetRecordType,
	getHashForString,
	TLAssetStore,
	TLBookmarkAsset,
	Tldraw,
	uniqueId,
} from 'tldraw'

const WORKER_URL = `http://localhost:5858`


function Presentation() {
	const { id } = useParams();
	
	const store = useSync({
		uri: `${WORKER_URL}/connect/${id}`,
		assets: multiplayerAssets,
	})

	return (
		<div style={{ position: 'fixed', inset: 0 }}>
			<Tldraw
				store={store}
				onMount={(editor) => {
					window.editor = editor
					editor.registerExternalAssetHandler('url', unfurlBookmarkUrl)
				}}
			/>
		</div>
	)
}

// How does our server handle assets like images and videos?
const multiplayerAssets: TLAssetStore = {
	// to upload an asset, we prefix it with a unique id, POST it to our worker, and return the URL
	async upload(_asset, file) {
		const id = uniqueId()

		const objectName = `${id}-${file.name}`
		const url = `${WORKER_URL}/uploads/${encodeURIComponent(objectName)}`

		const response = await fetch(url, {
			method: 'PUT',
			body: file,
		})

		if (!response.ok) {
			throw new Error(`Failed to upload asset: ${response.statusText}`)
		}

		return url
	},
	// to retrieve an asset, we can just use the same URL. you could customize this to add extra
	// auth, or to serve optimized versions / sizes of the asset.
	resolve(asset) {
		return asset.props.src
	},
}

// How does our server handle bookmark unfurling?
async function unfurlBookmarkUrl({ url }: { url: string }): Promise<TLBookmarkAsset> {
	const asset: TLBookmarkAsset = {
		id: AssetRecordType.createId(getHashForString(url)),
		typeName: 'asset',
		type: 'bookmark',
		meta: {},
		props: {
			src: url,
			description: '',
			image: '',
			favicon: '',
			title: '',
		},
	}

	try {
		const response = await fetch(`${WORKER_URL}/unfurl?url=${encodeURIComponent(url)}`)
		const data = await response.json()

		asset.props.description = data?.description ?? ''
		asset.props.image = data?.image ?? ''
		asset.props.favicon = data?.favicon ?? ''
		asset.props.title = data?.title ?? ''
	} catch (e) {
		console.error(e)
	}

	return asset
}

export default Presentation


// import React from 'react';
// import { Tldraw, track, useEditor } from 'tldraw';
// import 'tldraw/tldraw.css';
// import { Box, Typography } from '@mui/material';
// import { useParams } from 'react-router-dom';
// import { useSyncStore } from '../../utils/useSyncStore';

// const Presentation = ({ joinedUsers }) => {

//   const HOST_URL = 'ws://localhost:5173'

//     const { id } = useParams();

//     const store = useSyncStore({
//       roomId: id,
//       hostUrl: HOST_URL,
//     })


//   return (
//     <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
//       <div style={{ width: '80vw' }}>
//         <Tldraw
//             autoFocus
//             store={store}
//             components={{
//               SharePanel: NameEditor,
//             }}
//         />
//       </div>

//       <Box
//         sx={{
//           width: '20vw',
//           padding: '16px',
//           bgcolor: '#F9FAFB',
//           borderLeft: '1px solid #ccc',
//           boxShadow: 24,
//           overflowY: 'auto',
//         }}
//       >
//         <Typography variant="h6">Users Joined:</Typography>
//         {joinedUsers.length > 0 ? (
//           <ul>
//             {joinedUsers.map((user, index) => (
//               <li key={index}>{user}</li>
//             ))}
//           </ul>
//         ) : (
//           <Typography>No users joined yet</Typography>
//         )}
//       </Box>
//     </div>
//   );
// };

// export default Presentation;

// const NameEditor = track(() => {
// 	const editor = useEditor()

// 	const { color, name } = editor.user.getUserPreferences()

// 	return (
// 		<div style={{ pointerEvents: 'all', display: 'flex' }}>
// 			<input
// 				type="color"
// 				value={color}
// 				onChange={(e) => {
// 					editor.user.updateUserPreferences({
// 						color: e.currentTarget.value,
// 					})
// 				}}
// 			/>
// 			<input
// 				value={name}
// 				onChange={(e) => {
// 					editor.user.updateUserPreferences({
// 						name: e.currentTarget.value,
// 					})
// 				}}
// 			/>
// 		</div>
// 	)
// })