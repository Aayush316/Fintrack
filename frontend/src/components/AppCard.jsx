import './AppCard.css'

export default function AppCard({ person: { name, src, review } }) {
    const limitReview = (text, wordLimit) => {
      const words = text.split(' ');
      if (words.length <= wordLimit) {
        return text;
      }
      return words.slice(0, wordLimit).join(' ') + '...';
    };
  
    return (
      <div className="AppCard">
        <div className="image">
          <img className="personImg" src={src} alt="" />
        </div>
        <div className="review">
          <p className="name">{name}</p>
          <p className="description">{limitReview(review, 50)}</p>
        </div>
      </div>
    );
  }
  