package com.tiepsucomuathi.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "site_settings")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class SiteSetting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "hero_title", length = 255)
    private String heroTitle;

    @Column(name = "hero_subtitle", columnDefinition = "TEXT")
    private String heroSubtitle;

    @Column(name = "hero_background", length = 1000)
    private String heroBackground;

    @Column(name = "youtube_video_url", length = 1000)
    private String youtubeVideoUrl;

    @Column(name = "footer_text", columnDefinition = "TEXT")
    private String footerText;

    // Letter Screen Fields
    @Column(name = "letter_title", length = 255)
    private String letterTitle;

    @Column(name = "letter_subtitle", length = 255)
    private String letterSubtitle;

    @Column(name = "letter_date", length = 100)
    private String letterDate;

    @Column(name = "letter_content_1", columnDefinition = "TEXT")
    private String letterContent1;

    @Column(name = "letter_content_2", columnDefinition = "TEXT")
    private String letterContent2;

    @Column(name = "letter_content_3", columnDefinition = "TEXT")
    private String letterContent3;

    @Column(name = "letter_stat_1_val", length = 50)
    private String letterStat1Val;

    @Column(name = "letter_stat_1_lbl", length = 150)
    private String letterStat1Lbl;

    @Column(name = "letter_stat_2_val", length = 50)
    private String letterStat2Val;

    @Column(name = "letter_stat_2_lbl", length = 150)
    private String letterStat2Lbl;

    @Column(name = "letter_stat_3_val", length = 50)
    private String letterStat3Val;

    @Column(name = "letter_stat_3_lbl", length = 150)
    private String letterStat3Lbl;

    @Column(name = "letter_signature", length = 500)
    private String letterSignature;

    @Column(name = "letter_signer_name", length = 150)
    private String letterSignerName;

    @Column(name = "letter_signer_role", length = 255)
    private String letterSignerRole;

    @Column(name = "letter_signer_org", length = 255)
    private String letterSignerOrg;

    // Closing Screen Fields
    @Column(name = "closing_title", length = 255)
    private String closingTitle;

    @Column(name = "closing_subtitle", columnDefinition = "TEXT")
    private String closingSubtitle;

    @Column(name = "closing_content", columnDefinition = "TEXT")
    private String closingContent;

    @Column(name = "closing_vol_target")
    private Integer closingVolTarget;

    @Column(name = "closing_stu_target")
    private Integer closingStuTarget;

    @Column(name = "closing_days_target")
    private Integer closingDaysTarget;

    @Column(name = "closing_image", length = 1000)
    private String closingImage;
}
