import React, { useState } from "react";
import "./Comment.css";
import Displaycomment from "./Displaycomment";
import { useDispatch, useSelector } from "react-redux";
import { postcomment } from "../../action/comment";
import { isValidLanguage } from "../../utils/langaugeValidator";

function Comment({ videoid }) {
  const dispatch = useDispatch();
  const [commentText, setCommentText] = useState("");
  const [language, setLanguage] = useState(""); // Default language
  const currentuser = useSelector((state) => state.currentuserreducer);
  const commentsList = useSelector((state) => state.commentreducer);

  // Validate comment text to ensure it only contains valid characters (letters, numbers, emojis, basic punctuation)
  const isValidComment = (comment) => {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return !specialCharRegex.test(comment);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim() || !isValidComment(commentText)) {
      alert("Invalid comment. Special characters are not allowed.");
      return;
    }

    if (!isValidLanguage(language)) {
      alert(`'${language}' is an invalid source language.`);
      return;
    }

    if (currentuser) {
      dispatch(
        postcomment({
          videoid: videoid,
          userId: currentuser?.result._id,
          commentBody: commentText,
          userCommented: currentuser.result.name,
          city: currentuser.result.city,
          originalLanguage: language,
        })
      );
      setCommentText("");

      setLanguage("");
    } else {
      alert("Please log in to comment.");
    }
  };

  return (
    <>
      <form className="comments_sub_form_comments" onSubmit={handleOnSubmit}>
        <input
          type="text"
          onChange={(e) => setCommentText(e.target.value)}
          value={commentText}
          placeholder="Add Comment..."
          className="comment_ibox"
        />
        <select
          className="selecting_language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
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
        <button type="submit" className="comments_add_btn_comments">
          Add
        </button>
      </form>
      <div className="display_comment_container">
        {commentsList.data
          .filter((q) => videoid === q?.videoid)
          .slice()
          .reverse()
          .map((m) => {
            return (
              <Displaycomment
                key={m._id}
                cId={m._id}
                userId={m.userId}
                commentedon={m.commentedon}
                commentBody={m.commentBody}
                translatedComment={m.translatedComment}
                originalLanguage={m.originalLanguage}
                userCommented={m.userCommented}
                likes={m.likes}
                dislikes={m.dislikes}
                likedBy={m.likedBy}
                dislikedBy={m.dislikedBy}
                city={m.city}
              />
            );
          })}
      </div>
    </>
  );
}

export default Comment;
