import {Router} from 'express';

const router = Router(); // Create a new router instance

router.get('/product' , (req , res) => {
    res.json({message : req.something})
})
router.get('/product/:id' , () => {})
router.post('/product' , () => {})
router.put('/product/:id' , () => {})
router.delete('/product/:id' , () => {})

export default router