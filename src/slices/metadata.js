import {
  createSlice
} from 'redux-starter-kit';


export const metadataInitialState = {
  document_type: [],
  ip_type: [],
  uploading_app: [],
  cso_type: [],
  face_type: [],
  risk_rating: [],
  bap_document_type: [],
  office: [],
  head_office: []
};

const metadataSlice = createSlice({
  initialState: metadataInitialState,
  reducers: {
    onReceiveMetadata(state, action) {
      let metadata = {
        document_type: [],
        ip_type: [],
        uploading_app: [],
        cso_type: [],
        face_type: [],
        risk_rating: [],
        bap_document_type: [],
        office: [],
        head_office: [{code: 'Yes', description: 'Yes'}, {code: 'No', description: 'No'}]
      }
      action.payload.forEach(element => {
        let assetDupe = {
          ...element
        };
        delete assetDupe.category;
        metadata[element.category].push(assetDupe);
      });

      return metadata;
    }
  }
});

export const {
  reducer: metadata
} = metadataSlice;
export const {
  onReceiveMetadata
} = metadataSlice.actions;
