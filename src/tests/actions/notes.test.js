
/**
 * @jest-environment node
 */

import configureStore from 'redux-mock-store' //ES6 modules
import thunk from 'redux-thunk';
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { fileUpload } from '../../helpers/fileUpload';
import { types } from '../../types/types';

jest.mock('../../helpers/fileUpload', ()=>({
    fileUpload: jest.fn( ()=>{
        return 'https://hola-mundo.com/cosa.jpg';
    })
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
    auth:{
        uid:'TESTING',
    },
    notes:{
        active:{
            id:'3H92nRD15jaZUtaSWn8S',
            title:'Hola Mundo',
            body:'Que necio es Fernando Herrera',
        }
    }
}
let store = mockStore(initState);
describe('Pruebas las acciones en Notes.js', () => {

    beforeEach(()=>{

        store = mockStore(initState)

    });


    test('debe de crear una nueva nota Start New Note ', async() => {

        await store.dispatch( startNewNote());

        const actions = store.getActions();

        //console.log(actions);
        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload:{
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect( actions[1]).toEqual({
            type: types.notesAddNew,
            payload:{
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });
        
        const docId = actions[0].payload.id;
        await db.doc(`/TESTING/journal/notes/${docId}`).delete();

    },15000)
    
    test('startLoadingNotes debe cargar las notas ', async () => {

        await store.dispatch( startLoadingNotes('TESTING'));

        const actions = store.getActions();

        //console.log(actions);
        expect (actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)

        });

        const expected ={
            id:expect.any(String),
            title:expect.any(String),
            body:expect.any(String),
            date:expect.any(Number),
        }

        expect(actions[0].payload[0]).toMatchObject(expected);
    })
    
    test('startSaveNote debe actualizar Nota', async () => {
        const note={
            id:'3H92nRD15jaZUtaSWn8S',
            title:'titulo',
            body:'body'
        };

        await store.dispatch( startSaveNote(note));

        const actions = store.getActions();
        //console.log(actions);
        expect(actions[0].type).toBe(types.notesUpdated);
        const docRef = await db.doc(`/TESTING/journal/notes/${ note.id }`).get();

        expect( docRef.data().title).toBe(note.title);
    
    })

   /*  test('startUploading debe actualizar el URL del entry', async() => {
        
        const file = new File([],'foto.jpg');
        await store.dispatch(startUploading(file));

        const docRef = await db.doc('/TESTING/journal/notes/3H92nRD15jaZUtaSWn8S').get();
        expect (docRef.data().url).toBe('https://hola-mundo.com/cosa.jpg')
    }) */ 
    
    


    
})
