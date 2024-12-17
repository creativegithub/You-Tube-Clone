// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   deletecomment,
//   editcomment,
//   likeDislikeComment,
//   translateComment,
// } from "../../action/comment";
// import {
//   AiFillDislike,
//   AiFillLike,
//   AiOutlineDislike,
//   AiOutlineLike,
// } from "react-icons/ai";
// import moment from "moment";
// import { isValidLanguage } from "../../utils/langaugeValidator";

// function Displaycomment({
//   cId,
//   userId,
//   commentedon,
//   commentBody,
//   translatedComment, // Include translatedComment in props
//   originalLanguage, // Make sure you pass original language correctly from parent
//   userCommented,
//   likes,
//   dislikes,
//   likedBy = [],
//   dislikedBy = [],
//   city,
// }) {
//   const dispatch = useDispatch();
//   const [Edit, setEdit] = useState(false);
//   const [cmtBdy, setcmtBdy] = useState(commentBody);
//   const [likeBtn, setLikeBtn] = useState(false);
//   const [dislikeBtn, setDislikeBtn] = useState(false);
//   const [targetLanguage, setTargetLanguage] = useState("en"); // State for selected target language

//   const currentuser = useSelector((state) => state.currentuserreducer);

//   useEffect(() => {
//     if (currentuser) {
//       setLikeBtn(likedBy.includes(currentuser.result._id));
//       setDislikeBtn(dislikedBy.includes(currentuser.result._id));
//     }
//   }, [likedBy, dislikedBy, currentuser]);

//   const toggleLikeDislike = (type) => {
//     if (currentuser) {
//       const action = type === "like" ? likeBtn : dislikeBtn;
//       const oppositeAction = type === "like" ? dislikeBtn : likeBtn;

//       if (action) {
//         dispatch(likeDislikeComment(cId, type, -1));
//         type === "like" ? setLikeBtn(false) : setDislikeBtn(false);
//       } else {
//         dispatch(likeDislikeComment(cId, type, 1));
//         type === "like" ? setLikeBtn(true) : setDislikeBtn(true);

//         if (oppositeAction) {
//           dispatch(
//             likeDislikeComment(cId, type === "like" ? "dislike" : "like", -1)
//           );
//         }
//       }
//     } else {
//       alert(`Please login to ${type} this comment!`);
//     }
//   };

//   const handleEdit = () => {
//     setEdit(true);
//     setcmtBdy(commentBody);
//   };

//   const handleOnSubmit = (e) => {
//     e.preventDefault();
//     if (!cmtBdy.trim()) {
//       alert("Please type your comment!");
//     } else {
//       dispatch(editcomment({ id: cId, commentBody: cmtBdy }));
//       setcmtBdy("");
//     }
//     setEdit(false);
//   };

//   const handleDelete = () => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this comment?"
//     );
//     if (confirmDelete) {
//       dispatch(deletecomment(cId));
//     }
//   };

//   const handleTranslate = () => {
//     if (!targetLanguage) {
//       alert("Please choose a language to translate.");
//     } else if (!isValidLanguage(targetLanguage)) {
//       alert(`'${targetLanguage}' is an invalid target language.`);
//     } else {
//       dispatch(translateComment(cId, targetLanguage, originalLanguage));
//     }
//   };

//   return (
//     <div className="comment">
//       {Edit ? (
//         <form onSubmit={handleOnSubmit} className="comments_sub_form_comments">
//           <input
//             type="text"
//             name="Comments"
//             onChange={(e) => setcmtBdy(e.target.value)}
//             value={cmtBdy}
//             placeholder="Edit Comment..."
//             className="comment_ibox"
//           />
//           <input
//             type="submit"
//             value="Change"
//             className="comments_add_btn_comments"
//           />
//         </form>
//       ) : (
//         <>
//           <p className="comment_body">{commentBody}</p>
//           <p className="comment_translated_body">
//             (Translated: {translatedComment || "No translation available."})
//           </p>

//           <select
//             value={targetLanguage}
//             onChange={(e) => setTargetLanguage(e.target.value)}
//           >
//             <option value="">Select Language</option>
//             <option value="af-ZA">Afrikaans</option>
//             <option value="sq-AL">Albanian</option>
//             <option value="am-ET">Amharic</option>
//             <option value="ar-SA">Arabic</option>
//             <option value="hy-AM">Armenian</option>
//             <option value="az-AZ">Azerbaijani</option>
//             <option value="rm-RO">Balkan Gipsy</option>
//             <option value="eu-ES">Basque</option>
//             <option value="bn-IN">Bengali</option>
//             <option value="be-BY">Bielarus</option>
//             <option value="bi-VU">Bislama</option>
//             <option value="bs-BA">Bosnian</option>
//             <option value="br-FR">Breton</option>
//             <option value="bg-BG">Bulgarian</option>
//             <option value="my-MM">Burmese</option>
//             <option value="ca-ES">Catalan</option>
//             <option value="ch-GU">Chamorro</option>
//             <option value="zh-CN">Chinese (Simplified)</option>
//             <option value="zh-TW">Chinese Traditional</option>
//             <option value="ht-HT">Creole French (Haitian)</option>
//             <option value="hr-HR">Croatian</option>
//             <option value="cs-CZ">Czech</option>
//             <option value="da-DK">Danish</option>
//             <option value="nl-NL">Dutch</option>
//             <option value="dz-BT">Dzongkha</option>
//             <option value="en-GB">English</option>
//             <option value="eo-EU">Esperanto</option>
//             <option value="et-EE">Estonian</option>
//             <option value="fn-FNG">Fanagalo</option>
//             <option value="fo-FO">Faroese</option>
//             <option value="fi-FI">Finnish</option>
//             <option value="fr-FR">French</option>
//             <option value="gl-ES">Galician</option>
//             <option value="ka-GE">Georgian</option>
//             <option value="de-DE">German</option>
//             <option value="el-GR">Greek</option>
//             <option value="gu-IN">Gujarati</option>
//             <option value="ha-NE">Hausa</option>
//             <option value="he-IL">Hebrew</option>
//             <option value="hi-IN">Hindi</option>
//             <option value="hu-HU">Hungarian</option>
//             <option value="is-IS">Icelandic</option>
//             <option value="id-ID">Indonesian</option>
//             <option value="kl-GL">Inuktitut (Greenlandic)</option>
//             <option value="ga-IE">Irish Gaelic</option>
//             <option value="it-IT">Italian</option>
//             <option value="ja-JP">Japanese</option>
//             <option value="jv-ID">Javanese</option>
//             <option value="kn-IN">Kannada</option>
//             <option value="kk-KZ">Kazakh</option>
//             <option value="km-KM">Khmer</option>
//             <option value="rw-RW">Kinyarwanda</option>
//             <option value="rn-BI">Kirundi</option>
//             <option value="ko-KR">Korean</option>
//             <option value="ku-TR">Kurdish</option>
//             <option value="ky-KG">Kyrgyz</option>
//             <option value="lo-LA">Lao</option>
//             <option value="la-VA">Latin</option>
//             <option value="lv-LV">Latvian</option>
//             <option value="lt-LT">Lithuanian</option>
//             <option value="lb-LU">Luxembourgish</option>
//             <option value="mk-MK">Macedonian</option>
//             <option value="mg-MG">Malagasy</option>
//             <option value="ms-MY">Malay</option>
//             <option value="dv-MV">Maldivian</option>
//             <option value="mt-MT">Maltese</option>
//             <option value="gv-IM">Manx Gaelic</option>
//             <option value="mi-NZ">Maori</option>
//             <option value="mh-MH">Marshallese</option>
//             <option value="mn-MN">Mongolian</option>
//             <option value="ne-NP">Nepali</option>
//             <option value="no-NO">Norwegian</option>
//             <option value="ny-MW">Nyanja</option>
//             <option value="ur-PK">Pakistani</option>
//             <option value="pa-IN">Panjabi</option>
//             <option value="ps-PK">Pashto</option>
//             <option value="fa-IR">Persian</option>
//             <option value="pl-PL">Polish</option>
//             <option value="pt-PT">Portuguese</option>
//             <option value="qu-PE">Quechua</option>
//             <option value="ro-RO">Romanian</option>
//             <option value="ru-RU">Russian</option>
//             <option value="sm-WS">Samoan</option>
//             <option value="sg-CF">Sango</option>
//             <option value="gd-GB">Scots Gaelic</option>
//             <option value="sr-RS">Serbian</option>
//             <option value="sn-ZW">Shona</option>
//             <option value="si-LK">Sinhala</option>
//             <option value="sk-SK">Slovak</option>
//             <option value="sl-SI">Slovenian</option>
//             <option value="so-SO">Somali</option>
//             <option value="st-ST">Sotho, Southern</option>
//             <option value="es-ES">Spanish</option>
//             <option value="sw-SZ">Swahili</option>
//             <option value="sv-SE">Swedish</option>
//             <option value="de-CH">Swiss German</option>
//             <option value="tl-PH">Tagalog</option>
//             <option value="tg-TJ">Tajik</option>
//             <option value="ta-LK">Tamil</option>
//             <option value="te-IN">Telugu</option>
//             <option value="th-TH">Thai</option>
//             <option value="bo-CN">Tibetan</option>
//             <option value="ti-TI">Tigrinya</option>
//             <option value="to-TO">Tongan</option>
//             <option value="tn-BW">Tswana</option>
//             <option value="tr-TR">Turkish</option>
//             <option value="tk-TM">Turkmen</option>
//             <option value="uk-UA">Ukrainian</option>
//             <option value="uz-UZ">Uzbek</option>
//             <option value="vi-VN">Vietnamese</option>
//             <option value="cy-GB">Welsh</option>
//             <option value="wo-SN">Wolof</option>
//             <option value="xh-ZA">Xhosa</option>
//             <option value="yi-YD">Yiddish</option>
//             <option value="zu-ZA">Zulu</option>
//           </select>

//           <span className="translate_comment" onClick={handleTranslate}>
//             Translate
//           </span>
//         </>
//       )}

//       <div className="comment-actions">
//         <div
//           onClick={() => toggleLikeDislike("like")}
//           className={likeBtn ? "liked" : ""}
//         >
//           {likeBtn ? (
//             <AiFillLike size={22} className="btns_videoPage" />
//           ) : (
//             <AiOutlineLike size={22} className="btns_videoPage" />
//           )}
//           <b>Like</b>
//         </div>
//         <span>{likes}</span>

//         <div
//           onClick={() => toggleLikeDislike("dislike")}
//           className={dislikeBtn ? "disliked" : ""}
//         >
//           {dislikeBtn ? (
//             <AiFillDislike size={22} className="btns_videoPage" />
//           ) : (
//             <AiOutlineDislike size={22} className="btns_videoPage" />
//           )}
//           <b>Dislike</b>
//         </div>
//         <span>{dislikes}</span>
//       </div>

//       <p className="usercommented">
//         - {userCommented} from {city} commented {moment(commentedon).fromNow()}
//       </p>

//       {currentuser?.result?._id === userId && (
//         <div className="EditDel_DisplayComment">
//           <i onClick={handleEdit}>Edit</i>
//           <i onClick={handleDelete}>Delete</i>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Displaycomment;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletecomment,
  editcomment,
  likeDislikeComment,
  translateComment,
} from "../../action/comment";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import moment from "moment";
import { isValidLanguage } from "../../utils/langaugeValidator";

function Displaycomment({
  cId,
  userId,
  commentedon,
  commentBody,
  translatedComment,
  originalLanguage,
  userCommented,
  likes,
  dislikes,
  likedBy = [],
  dislikedBy = [],
  city,
}) {
  const dispatch = useDispatch();
  const [Edit, setEdit] = useState(false);
  const [cmtBdy, setcmtBdy] = useState(commentBody);
  const [likeBtn, setLikeBtn] = useState(false);
  const [dislikeBtn, setDislikeBtn] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState(""); // State for selected target language

  const currentuser = useSelector((state) => state.currentuserreducer);

  // Regex to detect special characters (excluding common punctuation)
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  useEffect(() => {
    if (currentuser) {
      setLikeBtn(likedBy.includes(currentuser.result._id));
      setDislikeBtn(dislikedBy.includes(currentuser.result._id));
    }
  }, [likedBy, dislikedBy, currentuser]);

  // Function to check for special characters in the comment
  const containsSpecialChars = (text) => specialCharRegex.test(text);

  const toggleLikeDislike = (type) => {
    if (currentuser) {
      const action = type === "like" ? likeBtn : dislikeBtn;
      const oppositeAction = type === "like" ? dislikeBtn : likeBtn;

      if (action) {
        dispatch(likeDislikeComment(cId, type, -1)); // Remove like/dislike
        type === "like" ? setLikeBtn(false) : setDislikeBtn(false);
      } else {
        dispatch(likeDislikeComment(cId, type, 1)); // Add like/dislike
        type === "like" ? setLikeBtn(true) : setDislikeBtn(true);

        // Remove the opposite reaction if already selected
        if (oppositeAction) {
          dispatch(
            likeDislikeComment(cId, type === "like" ? "dislike" : "like", -1)
          );
        }
      }

      // Automatically delete the comment if it receives 2 dislikes
      if (dislikes + 1 >= 2 && type === "dislike") {
        const confirmDelete = window.confirm(
          "This comment has received 2 dislikes. Do you want to delete it?"
        );
        if (confirmDelete) {
          dispatch(deletecomment(cId));
        }
      }
    } else {
      alert(`Please login to ${type} this comment!`);
    }
  };

  const handleEdit = () => {
    setEdit(true);
    setcmtBdy(commentBody);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    // Check if the comment contains special characters
    if (containsSpecialChars(cmtBdy)) {
      alert("Comment contains special characters which are not allowed.");
      return;
    }

    if (!cmtBdy.trim()) {
      alert("Please type your comment!");
    } else {
      dispatch(editcomment({ id: cId, commentBody: cmtBdy }));

      // Trigger translation if the comment body differs from translated comment and targetLanguage is set
      if (
        translatedComment !== cmtBdy &&
        targetLanguage &&
        isValidLanguage(targetLanguage)
      ) {
        dispatch(translateComment(cId, targetLanguage, originalLanguage));
      }

      // Clear the comment body and reset target language after submission
      setcmtBdy("");
      setTargetLanguage(""); // Reset target language after submit
    }
    setEdit(false);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (confirmDelete) {
      dispatch(deletecomment(cId));
    }
  };

  const handleTranslate = () => {
    if (!targetLanguage) {
      alert("Please choose a language to translate.");
    } else if (!isValidLanguage(targetLanguage)) {
      alert(`'${targetLanguage}' is an invalid target language.`);
    } else {
      dispatch(translateComment(cId, targetLanguage, originalLanguage));
    }
  };

  return (
    <div className="comment">
      {Edit ? (
        <form onSubmit={handleOnSubmit} className="comments_sub_form_comments">
          <input
            type="text"
            name="Comments"
            onChange={(e) => setcmtBdy(e.target.value)}
            value={cmtBdy}
            placeholder="Edit Comment..."
            className="comment_ibox"
          />
          <input
            type="submit"
            value="Change"
            className="comments_add_btn_comments"
          />
        </form>
      ) : (
        <>
          <p className="comment_body">{commentBody}</p>
          <p className="comment_translated_body">
            (Translated: {translatedComment || "No translation available."})
          </p>

          <select
            className="selecting_language"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
            <option value="">Select Language</option>
            <option value="af-ZA">Afrikaans</option>
            <option value="sq-AL">Albanian</option>
            <option value="am-ET">Amharic</option>
            <option value="ar-SA">Arabic</option>
            <option value="hy-AM">Armenian</option>
            <option value="az-AZ">Azerbaijani</option>
            <option value="rm-RO">Balkan Gipsy</option>
            <option value="eu-ES">Basque</option>
            <option value="bn-IN">Bengali</option>
            <option value="be-BY">Bielarus</option>
            <option value="bi-VU">Bislama</option>
            <option value="bs-BA">Bosnian</option>
            <option value="br-FR">Breton</option>
            <option value="bg-BG">Bulgarian</option>
            <option value="my-MM">Burmese</option>
            <option value="ca-ES">Catalan</option>
            <option value="ch-GU">Chamorro</option>
            <option value="zh-CN">Chinese (Simplified)</option>
            <option value="zh-TW">Chinese Traditional</option>
            <option value="ht-HT">Creole French (Haitian)</option>
            <option value="hr-HR">Croatian</option>
            <option value="cs-CZ">Czech</option>
            <option value="da-DK">Danish</option>
            <option value="nl-NL">Dutch</option>
            <option value="dz-BT">Dzongkha</option>
            <option value="en-GB">English</option>
            <option value="eo-EU">Esperanto</option>
            <option value="et-EE">Estonian</option>
            <option value="fn-FNG">Fanagalo</option>
            <option value="fo-FO">Faroese</option>
            <option value="fi-FI">Finnish</option>
            <option value="fr-FR">French</option>
            <option value="gl-ES">Galician</option>
            <option value="ka-GE">Georgian</option>
            <option value="de-DE">German</option>
            <option value="el-GR">Greek</option>
            <option value="gu-IN">Gujarati</option>
            <option value="ha-NE">Hausa</option>
            <option value="he-IL">Hebrew</option>
            <option value="hi-IN">Hindi</option>
            <option value="hu-HU">Hungarian</option>
            <option value="is-IS">Icelandic</option>
            <option value="id-ID">Indonesian</option>
            <option value="kl-GL">Inuktitut (Greenlandic)</option>
            <option value="ga-IE">Irish Gaelic</option>
            <option value="it-IT">Italian</option>
            <option value="ja-JP">Japanese</option>
            <option value="jv-ID">Javanese</option>
            <option value="kn-IN">Kannada</option>
            <option value="kk-KZ">Kazakh</option>
            <option value="km-KM">Khmer</option>
            <option value="rw-RW">Kinyarwanda</option>
            <option value="rn-BI">Kirundi</option>
            <option value="ko-KR">Korean</option>
            <option value="ku-TR">Kurdish</option>
            <option value="ky-KG">Kyrgyz</option>
            <option value="lo-LA">Lao</option>
            <option value="la-VA">Latin</option>
            <option value="lv-LV">Latvian</option>
            <option value="lt-LT">Lithuanian</option>
            <option value="lb-LU">Luxembourgish</option>
            <option value="mk-MK">Macedonian</option>
            <option value="mg-MG">Malagasy</option>
            <option value="ms-MY">Malay</option>
            <option value="dv-MV">Maldivian</option>
            <option value="mt-MT">Maltese</option>
            <option value="gv-IM">Manx Gaelic</option>
            <option value="mi-NZ">Maori</option>
            <option value="mh-MH">Marshallese</option>
            <option value="mn-MN">Mongolian</option>
            <option value="ne-NP">Nepali</option>
            <option value="no-NO">Norwegian</option>
            <option value="ny-MW">Nyanja</option>
            <option value="ur-PK">Pakistani</option>
            <option value="pa-IN">Panjabi</option>
            <option value="ps-PK">Pashto</option>
            <option value="fa-IR">Persian</option>
            <option value="pl-PL">Polish</option>
            <option value="pt-PT">Portuguese</option>
            <option value="qu-PE">Quechua</option>
            <option value="ro-RO">Romanian</option>
            <option value="ru-RU">Russian</option>
            <option value="sm-WS">Samoan</option>
            <option value="sg-CF">Sango</option>
            <option value="gd-GB">Scots Gaelic</option>
            <option value="sr-RS">Serbian</option>
            <option value="sn-ZW">Shona</option>
            <option value="si-LK">Sinhala</option>
            <option value="sk-SK">Slovak</option>
            <option value="sl-SI">Slovenian</option>
            <option value="so-SO">Somali</option>
            <option value="st-ST">Sotho, Southern</option>
            <option value="es-ES">Spanish</option>
            <option value="sw-SZ">Swahili</option>
            <option value="sv-SE">Swedish</option>
            <option value="de-CH">Swiss German</option>
            <option value="tl-PH">Tagalog</option>
            <option value="tg-TJ">Tajik</option>
            <option value="ta-LK">Tamil</option>
            <option value="te-IN">Telugu</option>
            <option value="th-TH">Thai</option>
            <option value="bo-CN">Tibetan</option>
            <option value="ti-TI">Tigrinya</option>
            <option value="to-TO">Tongan</option>
            <option value="tn-BW">Tswana</option>
            <option value="tr-TR">Turkish</option>
            <option value="tk-TM">Turkmen</option>
            <option value="uk-UA">Ukrainian</option>
            <option value="uz-UZ">Uzbek</option>
            <option value="vi-VN">Vietnamese</option>
            <option value="cy-GB">Welsh</option>
            <option value="wo-SN">Wolof</option>
            <option value="xh-ZA">Xhosa</option>
            <option value="yi-YD">Yiddish</option>
            <option value="zu-ZA">Zulu</option>
          </select>

          <span className="translate_comment" onClick={handleTranslate}>
            Translate
          </span>
        </>
      )}

      <div className="comment-actions">
        <div
          onClick={() => toggleLikeDislike("like")}
          className={likeBtn ? "liked" : ""}
        >
          {likeBtn ? (
            <AiFillLike size={22} className="btns_videoPage" />
          ) : (
            <AiOutlineLike size={22} className="btns_videoPage" />
          )}
          <b>Like</b>
        </div>
        <span>{likes}</span>

        <div
          onClick={() => toggleLikeDislike("dislike")}
          className={dislikeBtn ? "disliked" : ""}
        >
          {dislikeBtn ? (
            <AiFillDislike size={22} className="btns_videoPage" />
          ) : (
            <AiOutlineDislike size={22} className="btns_videoPage" />
          )}
          <b>Dislike</b>
        </div>
        <span>{dislikes}</span>
      </div>

      <p className="usercommented">
        - {userCommented} from {city} commented {moment(commentedon).fromNow()}
      </p>

      {currentuser?.result?._id === userId && (
        <div className="EditDel_DisplayComment">
          <i onClick={handleEdit}>Edit</i>
          <i onClick={handleDelete}>Delete</i>
        </div>
      )}
    </div>
  );
}

export default Displaycomment;
