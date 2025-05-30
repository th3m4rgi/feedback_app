import UserFeedback from '../models/UserFeedback.js';

const handleError = (res, error, statusCode = 500) => {
    console.error(error);
    res.status(statusCode).json({
      success: false,
      message: error.message || 'Internal Server error'
    });
  };
  
// Creates feedback with combination of firstName, lastName and email as the logical primary key
// If entry exists, update feedback and consign old feedback to history 
export const createOrUpdateFeedback = async (req, res) => {
    try {
        const { firstName, lastName, email, feedback, rating } = req.body;
        
        if (!firstName || !lastName || !email || !feedback || !rating) {
            return handleError(res, new Error('All fields are required'), 400);
        }

        const trimmedFirstName = firstName.trim();
        const trimmedLastName = lastName.trim();
        const trimmedEmail = email.toLowerCase().trim();
        const trimmedFeedback = feedback.trim();
        const numericRating = Number(rating);

        const existingFeedback = await UserFeedback.findOne({
            firstName: trimmedFirstName,
            lastName: trimmedLastName,
            email: trimmedEmail,
        });

        let result;

        if (existingFeedback) {
            existingFeedback.feedback = trimmedFeedback;
            existingFeedback.rating = numericRating;
            existingFeedback.updatedAt = new Date();
            
            result = await existingFeedback.save();

            return res.status(200).json({
                success: true,
                data: {
                    ...result.toObject(),
                }
            });
        } else {
            result = await UserFeedback.create({
                firstName: trimmedFirstName,
                lastName: trimmedLastName,
                email: trimmedEmail,
                feedback: trimmedFeedback,
                rating: numericRating
            });

            return res.status(201).json({
                success: true,
                data: {
                    ...result.toObject(),
                }
            });
        }

        
    } catch (error) {
        handleError(res, error);
    }
};

// Gets UserFeedback by id
export const getUserFeedbackById = async (req, res) => {
    try {
      const feedback = await UserFeedback.findById(req.params.id);
      
      if (!feedback) {
        return res.status(404).json({
          success: false,
          message: 'Not found'
        });
      }
  
      res.status(200).json({
        success: true,
        data: feedback
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Internal Server error'
      });
    }
  };
  
// Get all
export const getUserFeedback = async (req, res) => {
    try {
      const feedbacks = await UserFeedback.find().sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        count: feedbacks.length,
        data: feedbacks
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Internal Server error'
      });
    }
  };

export const deleteUserFeedback = async (req, res) => {
    try {
        const feedback = await UserFeedback.findByIdAndDelete(req.params.id);
    
        if (!feedback) {
        return res.status(404).json({
            success: false,
            message: 'Not Found'
        });
        }
    
        res.status(200).json({
        success: true,
        message: 'Deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: error.message || 'Internal Server error'
        });
    }
    };